import axios from 'axios';
import { defineStore } from 'pinia';

export const useEmployeeStore = defineStore({
    id: 'employee',
    state: () => ({

        items: [],
        edit_employee: {}
     
    }),
    actions: {
        setLoadEmployee() {
            return new Promise((resolve, reject) => {
                axios.get('employees')
                    .then(response => {
                        this.items = response.data.data;
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        setStoreEmployee(payload){
            return new Promise((resolve, reject) => {
                axios.post('employees', payload).then(response => {
                    resolve(response.data)
                }) .catch(err => {
                    reject(err)
                })
            })
        },
        setShowEmployee(payload) {
            return new Promise((resolve, reject)=> {
                axios.get(`employees/${payload}`).then((response) => {
                    this.edit_employee = response.data.data
                    resolve(response.data)
                }).catch(err => {
                    reject (err)
                })
            })
        },
        setUpdateEmployee(payload) {
            return new Promise((resolve, reject)=> {
                axios.put(`employees/${payload.id}`, payload).then((response)=> {
                    
                    resolve(response.data)
                }) .catch(err => {
                    reject (err)
                })
            })
        },

        setDeleteEmployee(payload) {
            return new Promise((resolve, reject) => {
                axios.delete(`employees/${payload}`).then((response) => {
                resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }

    },
    getters: {
    getLoadEmployee() {
        return this.items
    },
    getShowEmployee() {
        return this.edit_employee
     }
    }
});
