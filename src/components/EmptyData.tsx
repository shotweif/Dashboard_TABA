
interface EmptyDataProps {
    message: string;
}

export const EmptyData: React.FC<EmptyDataProps> = ({message}) => {
    return (
           <h3 className="text-lg font-semibold text-secondary text-green-600">{message}</h3>

    );
};
