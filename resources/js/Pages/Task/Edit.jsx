import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const Edit = ({ auth, task, projects, users }) => {
    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: task.name || '',
        description: task.description || '',
        status: task.status || '',
        due_date: task.due_date || '',
        project_id: task.project_id || '',
        priority: task.priority || '',
        assigned_user_id: task.assigned_user_id || '',
        _method: 'PUT'
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.update", task.id));
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Task : "{task.name}"
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className='mb-4'>
                                <InputLabel
                                    htmlFor="task_project_id"
                                    value="Project"
                                />
                                <SelectInput
                                    id="task_project_id"
                                    name="project_id"
                                    value={data.project_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('project_id', e.target.value)}
                                >
                                    <option value="">Select Project</option>
                                    {projects.data.map(project => (
                                        <option value={project.id} key={project.id}>{project.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.project_id} className="mt-2" />
                            </div>
                            {task.image_path &&
                                <div className='mb-4'>
                                    <img src={task.image_path} alt={task.name} className='w-full h-64' />
                                </div>
                            }
                            <div>
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="task_name"
                                    value="Task Name"
                                />
                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                />
                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />
                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="task_status"
                                    value="Task Status"
                                />
                                <SelectInput
                                    id="task_status"
                                    name="status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="task_priority"
                                    value="Task Priority"
                                />
                                <SelectInput
                                    id="task_priority"
                                    name="priority"
                                    value={data.priority}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('priority', e.target.value)}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>
                                <InputError message={errors.priority} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="assigned_user_id"
                                    value="Assigned User"
                                />
                                <SelectInput
                                    id="assigned_user_id"
                                    name="assigned_user_id"
                                    value={data.assigned_user_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('assigned_user_id', e.target.value)}
                                >
                                    <option value="">Select User</option>
                                    {users.data.map(user => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.assigned_user_id} className="mt-2" />
                            </div>
                            <div className='mt-4 text-right'>
                                <Link
                                    href={route("task.index")}
                                    className='bg-gray-100 py-1 px-3 text-gray-800 rounded hover:bg-gray-300 mr-2'
                                >
                                    Cancel
                                </Link>
                                <button className='bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Edit
