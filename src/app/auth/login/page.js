import { Input } from "@/components/forms/inputs";
import SubmitButton from "@/components/forms/submit-button";
import { loginAction } from "../actions";

export default function LoginPage(param) {
    return(
        <>
            <main>
                <h1 className="text-center text-4xl font-semibold">Enter your account</h1>
                <br />
                <form action={loginAction} id="sigunup-form" className="grid gap-4 max-w-screen-sm m-auto p-2">
                    <Input
                        classlabel="sr-only"
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        className="px-3 py-2 rounded text-neutral-700 focus:outline-none"
                    />
                    <Input
                        classlabel="sr-only"
                        label="password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="px-3 py-2 rounded text-neutral-700 focus:outline-none"
                    />
                    <SubmitButton label="Log in" className="hover:bg-violet-600 bg-violet-500" />
                </form>
            </main>
        </>
    )
}