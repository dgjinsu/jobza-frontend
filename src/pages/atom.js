import { atom } from 'recoil';

export const noState = atom({
  key: 'job',
  default: {
    selectedJob: '',
    cafe: 0.5,
    hospital: 0.5,
    health: 0.5,
    park: 0.5,
    mart: 0.5,
    fastFood: 0.5,
    wantedAuthNo: '', 
  },
});
