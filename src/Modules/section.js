import axios from "axios";
import { defineStore } from "pinia";

export const useSectionStore = defineStore({
  id: "section",
  state: () => ({
    items: [],
    edit_section: {}
  }),
  actions: {
    setLoadSection() {
      return new Promise((resolve, reject) => {
        axios
          .get("sections")
          .then((response) => {
            this.items = response.data.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setStoreSection(payload){
        return new Promise((resolve, reject) => {
            axios.post('sections', payload).then(response => {
                resolve(response.data)
            }) .catch(err => {
                reject(err)
            })
        })
    },
    setShowSection(payload) {
        return new Promise((resolve, reject)=> {
            axios.get(`sections/${payload}`).then((response) => {
                this.edit_section = response.data.data
                resolve(response.data)
            }).catch(err => {
                reject (err)
            })
        })
    },
    setUpdateSection(payload) {
        return new Promise((resolve, reject)=> {
            axios.put(`sections/${payload.id}`, payload).then((response)=> {
                
                resolve(response.data)
            }) .catch(err => {
                reject (err)
            })
        })
    },
    setDeleteSection(payload) {
        return new Promise((resolve, reject) => {
            axios.delete(`sections/${payload}`).then((response) => {
            resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
  },
  getters: {
    getLoadSection() {
      return this.items;
    },
    getShowSection() {
        return this.edit_section
     }
  },
});
