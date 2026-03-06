function SectionTitle({ number, children, className = '', as: Tag = 'div' }) {
    return (
        <Tag className={className}>
            <span>{number}</span> {children}
        </Tag>
    );
}

export default SectionTitle;
