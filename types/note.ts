export interface Note {
    id: number;
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
    createdAt: string;
    updatedAt: string;
  }
  
  
  
  export interface NoteFormValues {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  }