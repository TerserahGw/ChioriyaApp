import GroupForm from '../components/groups/GroupForm.jsx';

const CreateGroupPage = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Group</h1>
        <GroupForm />
      </div>
    </div>
  );
};

export default CreateGroupPage;