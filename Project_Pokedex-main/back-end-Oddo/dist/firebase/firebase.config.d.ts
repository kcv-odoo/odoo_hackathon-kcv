import admin from 'firebase-admin';
declare const _default: {
    setupFirebase: () => void;
    getFirestore: () => admin.firestore.Firestore;
    getStorageBucket: () => import("@google-cloud/storage").Bucket;
};
export default _default;
