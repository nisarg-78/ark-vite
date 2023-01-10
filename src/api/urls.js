console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
	const apiUrl = "http://localhost:8000/api"
} else {
	const apiUrl = "https://ark-api-r8tb.onrender.com/api"
}
export { apiUrl }
