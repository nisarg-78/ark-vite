let apiUrl
if (process.env.NODE_ENV === "development") {
	apiUrl = "http://localhost:8000/api"
} else {
	apiUrl = "https://ark-api-r8tb.onrender.com/api"
}
export { apiUrl }
