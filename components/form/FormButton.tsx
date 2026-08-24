import { Button } from "@/components/core/ui/button";
import { Spinner } from "@/components/core/spinner/Spinner";

export const FormButton = ({
    loading,
    children,
    classes,
    type,
    variant,
    ...buttonProps
}: {
    loading: boolean;
    children: React.ReactNode;
    classes?: string;
    type?: "submit" | "reset" | "button" | undefined;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
    buttonProps?: any;
}) => {
    return (
        <Button
            className={`w-full text-base p-2 ${classes || ""}`}
            disabled={loading}
            type={type ?? "button"}
            variant={variant}
            {...buttonProps}
        >
            <span className="ml-8 flex flex-row items-center">
                {children}
                <span className={`ml-1 ${loading ? "visible" : "invisible"}`}>
                    <Spinner />
                </span>
            </span>
        </Button>
    );
};