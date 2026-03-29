import path from "path";
import { GPT4All, Model } from "gpt4all";
import { z } from "zod";

export const jobOfferSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  salary: z.string().optional(),
  type: z.string().optional(),
  sector: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  mail: z.string().email().optional(),
  link: z.string().url().optional(),
});

export type JobOffer = z.infer<typeof jobOfferSchema>;

export async function parseJobOffer(text: string): Promise<JobOffer> {

  const modelPath = path.join(process.cwd(), "public/models/gpt4all-lora-quantized.bin");

  const gpt = new GPT4All({
    model: new Model({ file: modelPath })
  });

  await gpt.load();

  const prompt = `
Analyse cette offre d'emploi et renvoie STRICTEMENT un JSON conforme à ce schema :
${JSON.stringify(jobOfferSchema.shape, null, 2)}

Texte :
${text}

IMPORTANT : renvoie uniquement le JSON, rien d'autre.
`;

  const response = await gpt.prompt(prompt);

  const jsonMatch = response.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Impossible d'extraire un JSON valide");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return jobOfferSchema.parse(parsed);
}