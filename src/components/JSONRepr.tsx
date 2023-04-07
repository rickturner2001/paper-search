const JSONRepr = ({ data, title }: { data: any; title: string }) => {
  return (
    <details className="w-full rounded-md border border-gray-500 p-8">
      <summary>{title}</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
};

export default JSONRepr;
