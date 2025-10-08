import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    Calendar,
    FileText,
    DollarSign,
    Shield,
    Clock,
    UserCheck,
    BarChart3,
    Building2,
    Stethoscope
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Landing() {
    const features = [
        {
            icon: UserCheck,
            title: "Recepção Digital",
            description: "Simplifique o check-in de pacientes e visitantes. Agilize o registro, a impressão de etiquetas e o controle de filas em tempo real."
        },
        {
            icon: Users,
            title: "Gestão de Pacientes",
            description: "Gerencie prontuários eletrônicos de forma segura. Acesse histórico de tratamento e toda a documentação de saúde em um único lugar."
        },
        {
            icon: Calendar,
            title: "Agendamento Inteligente",
            description: "Facilite a agenda de coordenadores e terapeutas. A recepção tem visibilidade total da fila, garantindo um fluxo organizado."
        },
        {
            icon: DollarSign,
            title: "Gestão Financeira",
            description: "Sistema de faturamento e gestão financeira completo. Controle despesas, pagamentos e emita relatórios detalhados para uma visão clara do seu negócio."
        },
        {
            icon: Shield,
            title: "Acesso Baseado em Funções",
            description: "Garanta a segurança com painéis de acesso específicos para cada função: Administração, Finanças, Coordenação, Terapia e Recepção."
        },
        {
            icon: BarChart3,
            title: "Análises em Tempo Real",
            description: "Obtenha uma visão completa do seu negócio com relatórios em tempo real. Acompanhe o fluxo de pacientes, a performance financeira e a produtividade da equipe."
        }
    ]

    const dashboards = [
        { role: "Administrador", description: "Controle completo do sistema, gestão de equipe e supervisão institucional", icon: Building2 },
        { role: "Recepcionista", description: "Check-in de pacientes, registro de visitantes, gestão de filas", icon: UserCheck },
        { role: "Coordenador", description: "Gestão de agenda, atribuições de terapeutas, distribuição de carga de trabalho", icon: Calendar },
        { role: "Terapeuta", description: "Agenda pessoal, prontuários de pacientes, notas de sessão", icon: Stethoscope },
        { role: "Finanças", description: "Faturamento, pagamentos, despesas, relatórios financeiros", icon: DollarSign }
    ]

    return (
        <div className="min-h-screen bg-gradient-secondary">
            {/* Header */}
            <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Hospidata</h1>
                            <p className="text-xs text-muted-foreground">Plataforma de gestão para instituições de saúde</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link to="/login">Acesso</Link>
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-600 text-foreground mb-6">
                        Hospidata
                        <span className="text-transparent lg:text-2xl bg-gradient-primary bg-clip-text block">
                            Gestão eficiente para profissionais e empregadores
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
                        Simplifique a rotina da sua clínica ou hospital com uma plataforma integrada. Da recepção do paciente ao terapeuta e o coordenador, centralize a gestão de prontuários, agendamentos e portaria tudo em um só lugar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link to="/login">Acesse sua instituição</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-card/50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Modernize a rotina da sua instituição com nossos painéis
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A Hospidata se adapta à clínicas de todos os tamanhos, com segurança de nível empresarial e fluxos humanos variados.
                        </p>
                    </div>

                    <div className="grid text-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300"
                            >
                                <CardHeader className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            </section>

            {/* Dashboards Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Painéis de Controle por Função
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Cada membro da equipe tem acesso a um painel de controle adaptado à sua rotina, com permissões específicas e ferramentas personalizadas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dashboards.map((dashboard, index) => (
                            <Card key={index} className="border-border/50 shadow-soft">
                                <CardHeader className="text-center">
                                    <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                        <dashboard.icon className="w-8 h-8 text-accent-foreground" />
                                    </div>
                                    <CardTitle>{dashboard.role}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-center">
                                        {dashboard.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-primary">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                        Pronto para modernizar seu atendimento?
                    </h2>
                    <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                        Junte-se a outras instituições de saúde que já transformaram suas operações com Hospidata.
                    </p>
                    <Button variant="secondary" size="lg" asChild>
                        <Link to="/login">Comece sua Jornada</Link>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-card p-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Hospidata</h3>
                                <p className="text-xs text-muted-foreground">por OTWare</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2025 OTWare. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
