import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function StaffFields() {
  return (
    <div className="w-full max-w-md p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Nome do Funcionário:</FieldLegend>
            <FieldGroup>
              <Field>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Fulano de Tal"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Usuário de Acesso à Plataforma:
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="Usuário de Acesso à Plataforma"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Senha de Acesso à Plataforma:
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="Senha de Acesso à Plataforma"
                  required
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
              </div>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Registrar</Button>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
