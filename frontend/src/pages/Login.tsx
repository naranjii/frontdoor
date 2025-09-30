import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"
import { toast } from "sonner"
import { staffAPI } from "@/api/api"
import { AxiosError } from "axios"
import { AuthContext } from "@/context/AuthContext"

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useContext(AuthContext)

    if (!auth) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    const { login, logout } = auth

    useEffect(() => {
        logout()
    }, [logout]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password) {
            toast.error("Por favor preencha todos os campos")
            return
        }

        try {
            const { data } = await staffAPI.login({ username: username, password : password })
            if (data && data.token) {
                login(data.token)
                toast.success("Login bem-sucedido! Navegando até seu painel...")
                navigate("/dashboard")
            } else {
                toast.error("Resposta de login inválida do servidor.")
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Credenciais inválidas")
            } else {
                toast.error("Erro inesperado. Tente novamente.")
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl text-cyan-500 font-bold text-foreground">Bem-vindo!</h1>
                </div>

                {/* Login Card */}
                <Card className="border-border/50 shadow-medium">
                    <CardHeader>
                        <CardDescription>
                            Entre as credenciais fornecidas pelo seu administrador para acessar a plataforma
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome de Usuário</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="Seunomedeusuario@instituicao"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Entrar
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Precisa de ajuda? Contate o suporte
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <Button variant="ghost" asChild>
                        <Link to="/">← Voltar à Página Inicial</Link>
                    </Button>
                </div>

                <div className="mt-4 text-center text-xs text-muted-foreground">
                    © 2025 OTWare. Todos os direitos reservados.
                </div>
            </div>
        </div>
    )
}