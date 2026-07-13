import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bouncy } from "ldrs/react";
import "../../styles/Menu.css";
import BookItem from "./BookItem";

function FindBook({ shelves }) {
	const [input, setInput] = useState("");
	const [query, setQuery] = useState("");

	// Only update query 500ms after the user stops typing
	useEffect(() => {
		if (!input || input.length < 3) return;

		const timeout = setTimeout(() => {
			setQuery(input);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [input]);

	const { data: results, isLoading } = useQuery({
		queryKey: ["findBook", query],
		queryFn: async () => {
			const res = await fetch("http://localhost:8000/book/find", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: query,
				}),
			});

			const data = await res.json();
			return data.result;
		},
        // Won't run automatically, only when the final query is not empty and greater than 3 characters
		enabled: !!query && query.length >= 3,
	});

	return (
		<div className="find-book">
			<h1>Find A Book</h1>
			<form>
				<input
					type="text"
					id="title"
					placeholder="Enter book title or author"
					onChange={(event) => {
						setInput(event.target.value);
					}}
				/>
			</form>

			<div className="book-list">
				{isLoading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						<Bouncy color="#454d30" />
					</div>
				) : (
					<ul>
						{results
							? Object.values(results).map((result, index) => (
									<li key={result.key || index}>
										<BookItem
											shelves={shelves}
											bookKey={result.key}
											title={result.title}
											author={result.author}
											coverID={result.coverID}
											coverURL={result.coverURL}
										/>
									</li>
								))
							: null}
					</ul>
				)}
			</div>
		</div>
	);
}

export default FindBook;
