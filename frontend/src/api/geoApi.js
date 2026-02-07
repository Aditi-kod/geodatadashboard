export const fetchGeoData = async () => {
    // simulate API delay
    await new Promise((res) => setTimeout(res, 500));

    const response = await fetch("/data/geoData.json");
    if (!response.ok) {
        throw new Error("Failed to fetch geo data");
    }

    return response.json();
};
