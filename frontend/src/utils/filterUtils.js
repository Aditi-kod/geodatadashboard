export const normalizeGeoData = (data) => {
    return data.map((item, index) => ({
        id: index + 1,
        projectName: item.projectName,
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        status: item.status,
        lastUpdated: item.lastUpdated,
    }));
};
