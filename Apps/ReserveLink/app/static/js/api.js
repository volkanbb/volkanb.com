const API = {
    baseUrl: '/api',

    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...options.headers }
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.dispatchEvent(new CustomEvent('unauthorized'));
            }
            throw new Error(data.msg || 'Something went wrong');
        }

        return data;
    },

    auth: {
        login: (email, password) => API.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
        register: (data) => API.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        me: () => API.request('/auth/me')
    },

    customer: {
        getHotels: (page = 1, search = '') => API.request(`/customer/hotels?page=${page}&search=${search}`),
        getHotelRooms: (hotelId, page = 1) => API.request(`/customer/hotels/${hotelId}/rooms?page=${page}`),
        getServices: (page = 1, search = '', category = '') => API.request(`/customer/services?page=${page}&search=${search}&category=${category}`),
        getService: (id) => API.request(`/customer/services/${id}`),
        getAvailability: (serviceId, date = '') => API.request(`/customer/services/${serviceId}/availability?date=${date}`),
        createReservation: (data) => API.request('/customer/reservations', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        getMyReservations: (page = 1) => API.request(`/customer/reservations?page=${page}`),
        cancelReservation: (id) => API.request(`/customer/reservations/${id}/cancel`, { method: 'POST' })
    },

    admin: {
        getBusinesses: (page = 1) => API.request(`/admin/businesses?page=${page}`),
        createBusiness: (data) => API.request('/admin/businesses', { method: 'POST', body: JSON.stringify(data) }),
        updateBusiness: (id, data) => API.request(`/admin/businesses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        deleteBusiness: (id) => API.request(`/admin/businesses/${id}`, { method: 'DELETE' }),
        getUsers: (page = 1) => API.request(`/admin/users?page=${page}`),
        getLogs: (page = 1, search = '') => API.request(`/admin/logs?page=${page}&search=${search}`),
        createService: (data) => API.request('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
        updateService: (id, data) => API.request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        deleteService: (id) => API.request(`/admin/services/${id}`, { method: 'DELETE' }),
        generateServiceSlots: (id) => API.request(`/admin/services/${id}/generate-slots`, { method: 'POST' }),
        getReservations: (page = 1) => API.request(`/admin/reservations?page=${page}`),
        createSlot: (data) => API.request('/admin/slots', { method: 'POST', body: JSON.stringify(data) }),
        updateReservationStatus: (id, status) => API.request(`/admin/reservations/${id}/status`, {
            method: 'POST',
            body: JSON.stringify({ status })
        })
    }
};
