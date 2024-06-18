import { createClient } from "@/utils/supabase/server"

const getUser = async () => {
const supabase = createClient();
const res = await supabase.auth.getUser()
const user = {
    aud: res.data.user.aud,
    data: {
        id: res.data.user.id,
        email: res.data.user.email,
    }
}

return user
}

export default async function UserdLayout({ children }) {

    return (
        <>
            {children}
        </>
    )
}