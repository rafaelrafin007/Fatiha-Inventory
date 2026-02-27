import T from "@/components/T";

const roles = [
  { id: "U-01", name: "Fatiha Admin", role: "Admin", email: "admin@fatiha.org" },
  { id: "U-02", name: "Warehouse Lead", role: "Manager", email: "warehouse@fatiha.org" },
  { id: "U-03", name: "Field Ops", role: "Viewer", email: "field@fatiha.org" },
];

export default function UsersPage() {
  return (
    <main>
      <section className="page-section">
        <h1 className="page-title">
          <T k="users" />
        </h1>
        <p className="subtle">
          <T k="usersSubtext" />
        </p>
      </section>

      <section className="page-section">
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
