import { UseFormReturn } from "react-hook-form";
import { useVapiAssistants, useVapiPhoneNumbers } from "@/modules/plugins/hooks/use-vapi-data";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@workspace/ui/components/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { FormSchema } from "../../types";

interface VapiFormFieldsProps {
    form: UseFormReturn<FormSchema>;
}

export const VapiFormFields = ({
    form,
}: VapiFormFieldsProps) => {
    const { data: assistants, isLoading: assistantsLoading } = useVapiAssistants()
    const { data: phoneNumbers, isLoading: phoneNumbersLoading } = useVapiPhoneNumbers()
    const disabled = form.formState.isSubmitting
    return (
        <>
            <FormField
                control={form.control}
                name="vapiSettings.assistantId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Voice Assistant</FormLabel>
                        <Select
                            disabled={assistantsLoading||disabled}
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            assistantsLoading
                                                ? "Loading assistants..."
                                                : "Select an assistant"
                                        }
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {assistants?.map((assistant) => (
                                    <SelectItem
                                        key={assistant.id}
                                        value={assistant.id}
                                    >
                                        {assistant.name || "Unidentified Assistant"} - {" "} {assistant.model?.model || "Unknown model"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Select the voice assistant to handle voice calls from your customers.
                        </FormDescription>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="vapiSettings.phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Display Phone Number</FormLabel>
                        <Select
                            disabled={phoneNumbersLoading||disabled}
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            phoneNumbersLoading
                                                ? "Loading phone numbers..."
                                                : "Select a phone number"
                                        }
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {phoneNumbers?.map((phone) => (
                                    <SelectItem
                                        key={phone.id}
                                        value={phone.id || phone.number || "unknown"}
                                    >
                                        {phone.number || "Unknown"} - {" "} {phone.name || "Unnamed"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Phone number to display to customers when the voice assistant calls them.
                        </FormDescription>
                    </FormItem>
                )}
            />
        </>
    )
}
