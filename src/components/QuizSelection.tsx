interface QuizSettings {
    category: string;
    difficulty: string;
    type: string;
    amount: number;
}

const QuizSelection = ({
    handleStartQuiz,
}: {
    handleStartQuiz: (quizSettings: QuizSettings) => void;
}) => {
    return (
        <div className="w-full max-w-md px-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData);
                    const quizSettings: QuizSettings = {
                        category: data.category as string,
                        difficulty: data.difficulty as string,
                        type: data.type as string,
                        amount: Number(data.amount),
                    };
                    handleStartQuiz(quizSettings);
                }}
                className="flex flex-col gap-4"
            >
                <select
                    name="category"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-green-800 text-white"
                >
                    <option value="any" className="bg-green-800">
                        Any Category
                    </option>
                    <optgroup label="Entertainment" className="bg-green-800">
                        <option value="9" className="bg-green-800">
                            General Knowledge
                        </option>
                        <option value="10" className="bg-green-800">
                            Books
                        </option>
                        <option value="11" className="bg-green-800">
                            Film
                        </option>
                        <option value="12" className="bg-green-800">
                            Music
                        </option>
                        <option value="13" className="bg-green-800">
                            Musicals & Theatre
                        </option>
                        <option value="14" className="bg-green-800">
                            Television
                        </option>
                        <option value="15" className="bg-green-800">
                            Video Games
                        </option>
                        <option value="16" className="bg-green-800">
                            Board Games
                        </option>
                        <option value="29" className="bg-green-800">
                            Comics
                        </option>
                        <option value="31" className="bg-green-800">
                            Japanese Anime & Manga
                        </option>
                        <option value="32" className="bg-green-800">
                            Cartoons & Animation
                        </option>
                    </optgroup>
                    <optgroup label="Science" className="bg-green-800">
                        <option value="17" className="bg-green-800">
                            Nature
                        </option>
                        <option value="18" className="bg-green-800">
                            Computers
                        </option>
                        <option value="19" className="bg-green-800">
                            Mathematics
                        </option>
                        <option value="30" className="bg-green-800">
                            Gadgets
                        </option>
                    </optgroup>
                    <optgroup label="Other" className="bg-green-800">
                        <option value="20" className="bg-green-800">
                            Mythology
                        </option>
                        <option value="21" className="bg-green-800">
                            Sports
                        </option>
                        <option value="22" className="bg-green-800">
                            Geography
                        </option>
                        <option value="23" className="bg-green-800">
                            History
                        </option>
                        <option value="24" className="bg-green-800">
                            Politics
                        </option>
                        <option value="25" className="bg-green-800">
                            Art
                        </option>
                        <option value="26" className="bg-green-800">
                            Celebrities
                        </option>
                        <option value="27" className="bg-green-800">
                            Animals
                        </option>
                        <option value="28" className="bg-green-800">
                            Vehicles
                        </option>
                    </optgroup>
                </select>
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
                    {['any', 'easy', 'medium', 'hard'].map((value) => (
                        <label key={value} className="cursor-pointer flex-1">
                            <input
                                type="radio"
                                name="difficulty"
                                value={value}
                                defaultChecked={value === 'any'}
                                className="hidden peer"
                            />
                            <div
                                className="px-2 sm:px-4 py-2 rounded-lg bg-green-800 text-white text-sm sm:text-base
                                          peer-checked:bg-green-500 hover:bg-green-600 
                                          transition-colors duration-200 capitalize text-center"
                            >
                                {value}
                            </div>
                        </label>
                    ))}
                </div>
                <input
                    type="number"
                    name="amount"
                    placeholder="Number of Questions"
                    required
                    min={3}
                    max={50}
                    defaultValue={10}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-green-800 text-white 
                                       hover:bg-green-600 focus:bg-green-600 
                                       cursor-pointer outline-none 
                                       transition-colors duration-200
                                       [appearance:textfield] 
                                       [&::-webkit-outer-spin-button]:appearance-none 
                                       [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="flex flex-row gap-4 justify-between">
                    {[
                        { value: 'any', label: 'Any Type' },
                        { value: 'multiple', label: 'Multiple Choice' },
                        { value: 'boolean', label: 'True / False' },
                    ].map(({ value, label }) => (
                        <label key={value} className="cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value={value}
                                defaultChecked={value === 'any'}
                                className="hidden peer"
                            />
                            <div
                                className="px-4 py-2 rounded-lg bg-green-800 text-white 
                                          peer-checked:bg-green-500 hover:bg-green-600 
                                          transition-colors duration-200"
                            >
                                {label}
                            </div>
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-green-500 text-white 
                               hover:bg-green-400 focus:bg-green-400 font-bold"
                >
                    Start Quiz
                </button>
            </form>
        </div>
    );
};

export default QuizSelection;
