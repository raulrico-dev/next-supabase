"use client"

import { useFormStatus } from 'react-dom'

export default function SubmitButton(props) {
    const { pending } = useFormStatus()
    return <button {...props} type="submit" disabled={pending} className={`font-medium text-white/90 p-3 w-full flex flex-row justify-center items-center rounded ${props.className}`}>{pending ? "Loading..." : props.label}</button>
}