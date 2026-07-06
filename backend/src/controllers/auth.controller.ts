import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../utils/prisma'
import { generateToken } from '../utils/jwt'

// ثبت نام
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // چک کن همه فیلدها پر شدن
    if (!name || !email || !password) {
      res.status(400).json({ message: 'همه فیلدها الزامی هستند' })
      return
    }

    // چک کن ایمیل قبلاً ثبت نشده
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      res.status(400).json({ message: 'این ایمیل قبلاً ثبت شده' })
      return
    }

    // پسورد رو هش کن
    const hashedPassword = await bcrypt.hash(password, 10)

    // کاربر رو بساز
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    // توکن بساز
    const token = generateToken(user.id)

    res.status(201).json({
      message: 'ثبت نام موفقیت آمیز بود',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور' })
  }
}

// ورود
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // چک کن همه فیلدها پر شدن
    if (!email || !password) {
      res.status(400).json({ message: 'همه فیلدها الزامی هستند' })
      return
    }

    // کاربر رو پیدا کن
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(400).json({ message: 'ایمیل یا پسورد اشتباه است' })
      return
    }

    // پسورد رو چک کن
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(400).json({ message: 'ایمیل یا پسورد اشتباه است' })
      return
    }

    // توکن بساز
    const token = generateToken(user.id)

    res.json({
      message: 'ورود موفقیت آمیز بود',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور' })
  }
}

// اطلاعات کاربر لاگین شده
export const getMe = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور' })
  }
}