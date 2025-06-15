export function MedicalTest() {
  const tests = [
    {
      name: "Complete Blood Count (CBC)",
      type: "Blood Test",
      price: "$25",
      duration: "1 day",
      status: "Available",
    },
    {
      name: "X-Ray Chest",
      type: "Imaging",
      price: "$40",
      duration: "Same day",
      status: "Available",
    },
    {
      name: "COVID-19 PCR",
      type: "Virology",
      price: "$60",
      duration: "1-2 days",
      status: "Unavailable",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Medical Test Catalog</h2>
      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Test Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2 font-medium">{test.name}</td>
                <td className="px-4 py-2">{test.type}</td>
                <td className="px-4 py-2">{test.price}</td>
                <td className="px-4 py-2">{test.duration}</td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${test.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{test.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
