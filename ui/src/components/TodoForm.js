import { useRef } from "react";
import { useForm } from "react-hook-form";

export const TodoForm = ({
    currentTodo,
    mode,
    handleCurrentTodoIndex,
    addTodo,
    editTodo
}) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = (data, event) => {
        event.preventDefault();
        if (mode === "ADD") addTodo({ ...data });
        else editTodo({ ...data, _id: currentTodo._id, date: currentTodo.date });
    }
    const formRef = useRef(null)
    return (
        <div>
            <h1 className='pt-12 pb-5 text-xl'>
                {mode === "ADD" ? <> Add Todos... </> : <> Edit Todos... </>}
            </h1>
            {/* {error && <p className="mt-2 mb-2 text-red-600">{error.message}</p>} */}
            <form
                formRef={formRef}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    <input
                        type="text"
                        defaultValue={currentTodo.title}
                        {...register("title")}
                        required
                        placeholder="Enter your title..."
                        className="input input-bordered dark:bg-white text-lg inline w-full  mb-2"
                    />
                    <textarea id="message"
                        defaultValue={currentTodo.title}
                        {...register("desc")}
                        required
                        title="Enter your desc please"
                        placeholder="Enter your description please..."
                        className="textarea textarea-bordered dark:bg-white w-full text-lg"
                        rows={3}
                    ></textarea>
                    <div className="flex justify-center">
                        {mode === "ADD" ?
                            <>
                                <button className="btn btn-primary mt-4 mx-auto" type="submit" >
                                    Add Todo
                                </button>
                            </>
                            :
                            <>
                                <button className="btn btn-primary mt-4 mx-auto" type="submit">
                                    Edit Todo
                                </button>
                                <button className="btn btn-primary mt-4 mx-auto"
                                    onClick={() => { reset(); handleCurrentTodoIndex(-1); }}>
                                    Add mode
                                </button>
                            </>
                        }
                    </div>

                </div>
            </form>
        </div>
    );
};

