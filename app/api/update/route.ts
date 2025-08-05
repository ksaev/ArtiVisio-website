import {prisma} from '@/lib/prisma';
import { hash } from 'bcryptjs';

async function createAdmin(email: string, password: string) {
  try {
    const hashedPassword = await hash(password, 10);
    const admin = await prisma.administrateur.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log('Admin created:', admin);
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin('admin@artivisio.com', 'Arti225');
