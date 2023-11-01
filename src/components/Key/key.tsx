import './key.scss';

type KeyProps = {
    label: string;
}

export default function Key ({ label } : KeyProps) {
    return <span className="keyboard-key">{label}</span>;
}