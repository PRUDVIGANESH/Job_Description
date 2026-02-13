


interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <div style={{
            padding: 'var(--space-xl) var(--space-md)',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '32px',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-text-primary)'
            }}>
                {title}
            </h1>
            <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '16px',
                fontStyle: 'italic',
                fontFamily: 'var(--font-sans)'
            }}>
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default PlaceholderPage;
