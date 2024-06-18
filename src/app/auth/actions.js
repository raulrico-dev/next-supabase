"use server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { z } from 'zod'



export async function loginAction(formData) {
    const User = z.object({
        email: z
            .string()
            .trim()
            .email('Invalid email address'), // Using built-in email validation
        password: z
            .string()
            .trim()
            .min(8, 'Password must be at least 8 characters long'),
    });

    let success = null

    try {
        // Validate input data
        const validatedUser = User.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (!validatedUser.success) {
            // Handle validation errors
            console.error(validatedUser.error.issues);
            return { success: false, errors: validatedUser.error.issues };
        }

        const userData = {
            email: validatedUser.data.email,
            password: validatedUser.data.password
        };

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword(userData)

        if (error) {
            console.log(error);
            success = null
            return;
        }

        success = true;
        return
    } catch (error) {
        console.log(error);
        return;
    } finally {

        if (!success) {
            console.log("Login Failed");
            return;
        }

        console.log("Login Success");
        revalidatePath('/', 'layout')
        redirect('/')
    }

}

export async function signUpAction(formData) {
    const User = z.object({
        email: z
            .string()
            .trim()
            .email('Invalid email address'), // Using built-in email validation
        password: z
            .string()
            .trim()
            .min(8, 'Password must be at least 8 characters long'),
        confirmation: z
            .string()
            .min(8, { message: "Password confirmation must be at least 6 characters long" }),
    }).refine((data) => data.password === data.confirmation, {
        message: "Passwords don't match",
        path: ['passwordConfirmation'], // path of error
    });

    let success = null

    try {
        const validatedUser = User.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
            confirmation: formData.get('confirmation'),
        });

        if (!validatedUser.success) {
            // Handle validation errors
            console.error(validatedUser.error.issues);
            return { success: false, errors: validatedUser.error.issues };
        }
        const userData = {
            email: validatedUser.data.email,
            password: validatedUser.data.password
        };

        const supabase = createClient()

        const { error } = await supabase.auth.signUp(userData)

        if (error) {
            console.log(error);
            success = null
            return;
        }

        success = true;
        return
    } catch (error) {
        console.log(error);
        return;
    } finally {

        if (!success) {
            console.log("Signup Failed");
            return;
        }

        console.log("Signup Success");
        revalidatePath('/', 'layout')
        redirect('/auth/login')
    }
}


export async function signOutAction() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}