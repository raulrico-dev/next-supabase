import { signOutAction } from "@/app/auth/actions";

export default function SignOutButton(props) {
    return(
        <form>
            <button formAction={signOutAction} className={props.className}>{props.children}</button>
        </form>
    )
}