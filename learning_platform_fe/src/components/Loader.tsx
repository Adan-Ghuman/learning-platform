type Props = {
    fullScreen?: boolean;
    size?: number;
};

export default function Loader({ fullScreen = false, size = 2 }: Props) {
    // `size` is in rems for predictable scaling
    return (
        <div className={fullScreen ? "min-h-[60vh] flex items-center justify-center" : "flex justify-center items-center py-12"}>
            <div className="animate-spin rounded-full border-b-2 border-primary" style={{ height: `${size}rem`, width: `${size}rem` }} />
        </div>
    );
}
