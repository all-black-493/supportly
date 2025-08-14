"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@workspace/ui/lib/utils"
import { Label } from "@workspace/ui/components/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * A container for a single form item that provides a stable, unique id to descendants via FormItemContext.
 *
 * The component renders a div with data-slot="form-item", applies the default layout classes ("grid gap-2")
 * (merged with any provided `className`), and forwards all other props to the div. The generated id
 * is exposed to children through FormItemContext for linking labels, controls, descriptions, and messages.
 */
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

/**
 * A label component wired to the surrounding FormField that reflects field error state.
 *
 * Reads the current field's state via useFormField and renders a Radix Label whose
 * `htmlFor` is bound to the form field's generated id. Exposes `data-slot="form-label"`
 * and `data-error` for styling hooks and applies an error class when the field has an error.
 */
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

/**
 * Renders a form control wrapper (Radix Slot) wired to the current form field context.
 *
 * Uses useFormField to obtain the field IDs and error state, then:
 * - sets the element `id` to the form item id,
 * - sets `aria-describedby` to the description id alone when there's no error or to both the description and message ids when an error exists,
 * - sets `aria-invalid` when the field has an error.
 *
 * This component forwards all received props to the underlying Slot.
 *
 * @returns The rendered Slot element for the form control.
 */
function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

/**
 * Renders the form field description text and links it to the current field for accessibility.
 *
 * The paragraph's id is provided from the surrounding FormItem via useFormField and is intended
 * to be referenced by form controls' `aria-describedby`.
 *
 * @returns The rendered paragraph element containing the field description.
 */
function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders a form field message element that shows either the field error message or the provided children.
 *
 * When the current field has a validation error, the error's `message` string is shown. Otherwise `children` are rendered.
 * If the resolved message is empty or falsy, the component returns `null` (renders nothing).
 *
 * The rendered `<p>` receives an autogenerated `id` tied to the field (for ARIA relationships), a `data-slot="form-message"` attribute, and styling for destructive/error text.
 *
 * @remarks
 * - This component must be used within a `FormField` context (it relies on `useFormField`).
 *
 * @param props - Standard `<p>` element props; `children` is used as the fallback message when there is no field error.
 */
function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
