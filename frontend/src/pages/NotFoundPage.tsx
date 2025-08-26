import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold text-muted-foreground">404</CardTitle>
                    <CardDescription className="text-lg">
                        Oops! The page you&apos;re looking for doesn&apos;t exist.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link to="/">Go Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
