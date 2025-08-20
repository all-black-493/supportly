import { ConversationsLayout } from "@/modules/dashboard/ui/layouts/conversations-layout";

export const Layout = ({
    children
}:{children: React.ReactNode}) =>{
    return <ConversationsLayout>{children}</ConversationsLayout>
}

export default Layout