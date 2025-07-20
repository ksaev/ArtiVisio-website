"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }))

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: idx * 0.5 + index * 0.05,
                }}
                className={cn("dark:text-white text-black", word.className)}
                key={`char-${index}`}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold", className)}>
      <motion.div
        className="inline"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold">{renderWords()}</div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-amber-500", cursorClassName)}
      ></motion.span>
    </div>
  )
}
