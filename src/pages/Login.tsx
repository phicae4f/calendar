import { Layout, Row } from "antd"
import { FC } from "react"
import { LoginForm } from "../components/LoginForm"

export const Login: FC = () => {
    return(
        <Layout>
            <Row justify="center" align="middle" className="login">
                <LoginForm />
            </Row>
        </Layout>
    )
}