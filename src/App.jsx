import React, { useEffect, useMemo, useState } from 'react';
import {
 Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen, Bug, Check,
 ChevronRight, CircleHelp, Code2, Copy, Cpu, Download, FileCode, FileUp,
 Gauge, GitBranch, GraduationCap, Layers, List, MemoryStick, Play, Plus,
 RotateCcw, Search, Settings2, ShieldAlert, SkipBack, SkipForward, Trash2,
 Trophy, Undo2, Redo2, X, Zap
} from 'lucide-react';

const TYPES={
 SLL:{name:'Singly Linked List',short:'SLL',description:'Each node stores data and a pointer to the next node.'},
 DLL:{name:'Doubly Linked List',short:'DLL',description:'Each node stores previous and next pointers.'},
 CLL:{name:'Circular Linked List',short:'CLL',description:'The last node points back to the first node.'},
 DCLL:{name:'Doubly Circular Linked List',short:'DCLL',description:'Previous and next pointers form a circular structure.'}
};
const initialValues=[12,25,38,42];
const quizzes=[
 {q:'Which pointer does a singly linked-list node contain?',options:['prev','next','head','tail'],answer:1,why:'A singly linked-list node contains data and one next pointer.'},
 {q:'What does the last SLL node point to?',options:['HEAD','Itself','NULL','Previous node'],answer:2,why:'The next pointer of the last singly linked-list node is NULL.'},
 {q:'Which operation is O(1) in a singly linked list when head is known?',options:['Search','Insert at beginning','Access index 5','Sort'],answer:1,why:'Insertion at the beginning only changes the new node next and head.'},
 {q:'Which traversal loop is commonly used for a circular linked list?',options:['while(temp == NULL)','do...while(temp != head)','for(i=0;i<NULL;i++)','while(head == NULL)'],answer:1,why:'A do-while loop visits the first node before checking whether traversal returned to head.'},
 {q:'What should be called after a dynamically allocated node is no longer needed?',options:['malloc','sizeof','free','printf'],answer:2,why:'free() releases dynamically allocated memory.'}
];
const debugCases=[
 {title:'Lost node',symptom:'A node becomes unreachable after insertion.',cause:'The previous node was not connected to the new node before changing the head or link.',fix:'Save the old next pointer, connect newNode->next to it, then connect the previous link to newNode.'},
 {title:'Dangling pointer',symptom:'A pointer still refers to memory after a node is deleted.',cause:'The node was freed but another pointer still stores its old address.',fix:'Update neighbouring links first, free the node, and set any reusable pointer to NULL.'},
 {title:'Infinite circular traversal',symptom:'Display never stops in a circular linked list.',cause:'Traversal checks temp != NULL even though a circular list never reaches NULL.',fix:'Stop when temp becomes equal to HEAD again.'},
 {title:'Broken DLL backward link',symptom:'Forward traversal works but backward traversal fails.',cause:'next was updated but the corresponding prev pointer was not.',fix:'Whenever A->next becomes B, also set B->prev = A.'}
];
const complexity=[
 ['Search','O(n)','O(n)','O(n)','O(n)'],
 ['Insert at beginning','O(1)','O(1)','O(1)','O(1)'],
 ['Insert at end','O(n)','O(n)','O(1)*','O(1)*'],
 ['Delete at beginning','O(1)','O(1)','O(1)','O(1)'],
 ['Access by index','O(n)','O(n)','O(n)','O(n)']
];
const codeSnippets={
SLL:`struct Node {
    int data;
    struct Node *next;
};

void insertBeginning(int value) {
    struct Node *newNode = malloc(sizeof(struct Node));
    if (newNode == NULL) return;

    newNode->data = value;
    newNode->next = head;
    head = newNode;
}`,
DLL:`struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};

void insertBeginning(int value) {
    struct Node *newNode = malloc(sizeof(struct Node));
    if (newNode == NULL) return;

    newNode->data = value;
    newNode->prev = NULL;
    newNode->next = head;

    if (head != NULL)
        head->prev = newNode;

    head = newNode;
}`,
CLL:`struct Node {
    int data;
    struct Node *next;
};

void insertBeginning(int value) {
    struct Node *newNode = malloc(sizeof(struct Node));
    if (newNode == NULL) return;

    newNode->data = value;

    if (last == NULL) {
        last = newNode;
        newNode->next = newNode;
    } else {
        newNode->next = last->next;
        last->next = newNode;
    }
}`,
DCLL:`struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};

void insertBeginning(int value) {
    struct Node *newNode = malloc(sizeof(struct Node));
    if (newNode == NULL) return;

    if (head == NULL) {
        head = newNode;
        newNode->next = newNode;
        newNode->prev = newNode;
    } else {
        struct Node *last = head->prev;
        newNode->data = value;
        newNode->next = head;
        newNode->prev = last;
        last->next = newNode;
        head->prev = newNode;
        head = newNode;
    }
}`
};
const completePrograms = {
SLL: `// SINGLY LINKED LIST - complete menu-driven program
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *head = NULL;

void insertBeginning(void) {
    int value;
    struct Node *newNode;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;
    newNode->next = head;
    head = newNode;
    printf("Node inserted.\\n");
}

void insertEnd(void) {
    int value;
    struct Node *newNode, *temp;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;
    newNode->next = NULL;

    if (head == NULL) {
        head = newNode;
    } else {
        temp = head;
        while (temp->next != NULL)
            temp = temp->next;
        temp->next = newNode;
    }
    printf("Node inserted.\\n");
}

void deleteBeginning(void) {
    struct Node *temp;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = head;
    head = head->next;
    printf("Deleted value: %d\\n", temp->data);
    free(temp);
}

void deleteEnd(void) {
    struct Node *temp, *previous;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    if (head->next == NULL) {
        printf("Deleted value: %d\\n", head->data);
        free(head);
        head = NULL;
        return;
    }

    previous = NULL;
    temp = head;
    while (temp->next != NULL) {
        previous = temp;
        temp = temp->next;
    }

    previous->next = NULL;
    printf("Deleted value: %d\\n", temp->data);
    free(temp);
}

void searchNode(void) {
    int key, position = 0;
    struct Node *temp = head;

    printf("Enter value to search: ");
    scanf("%d", &key);

    while (temp != NULL) {
        if (temp->data == key) {
            printf("Found at position %d.\\n", position + 1);
            return;
        }
        temp = temp->next;
        position++;
    }
    printf("Value not found.\\n");
}

void display(void) {
    struct Node *temp = head;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    printf("HEAD -> ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

void freeList(void) {
    struct Node *temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

int main(void) {
    int choice;

    while (1) {
        printf("\\n--- SINGLY LINKED LIST ---\\n");
        printf("1. Insert at beginning\\n");
        printf("2. Insert at end\\n");
        printf("3. Delete from beginning\\n");
        printf("4. Delete from end\\n");
        printf("5. Search\\n");
        printf("6. Display\\n");
        printf("7. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input.\\n");
            break;
        }

        switch (choice) {
            case 1: insertBeginning(); break;
            case 2: insertEnd(); break;
            case 3: deleteBeginning(); break;
            case 4: deleteEnd(); break;
            case 5: searchNode(); break;
            case 6: display(); break;
            case 7: freeList(); return 0;
            default: printf("Invalid choice.\\n");
        }
    }

    freeList();
    return 0;
}`,
DLL: `// DOUBLY LINKED LIST - complete menu-driven program
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};

struct Node *head = NULL;

void insertBeginning(void) {
    int value;
    struct Node *newNode;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;
    newNode->prev = NULL;
    newNode->next = head;

    if (head != NULL)
        head->prev = newNode;

    head = newNode;
    printf("Node inserted.\\n");
}

void insertEnd(void) {
    int value;
    struct Node *newNode, *temp;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;
    newNode->next = NULL;
    newNode->prev = NULL;

    if (head == NULL) {
        head = newNode;
    } else {
        temp = head;
        while (temp->next != NULL)
            temp = temp->next;

        temp->next = newNode;
        newNode->prev = temp;
    }
    printf("Node inserted.\\n");
}

void deleteBeginning(void) {
    struct Node *temp;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = head;
    head = head->next;

    if (head != NULL)
        head->prev = NULL;

    printf("Deleted value: %d\\n", temp->data);
    free(temp);
}

void deleteEnd(void) {
    struct Node *temp;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = head;
    while (temp->next != NULL)
        temp = temp->next;

    if (temp->prev == NULL)
        head = NULL;
    else
        temp->prev->next = NULL;

    printf("Deleted value: %d\\n", temp->data);
    free(temp);
}

void searchNode(void) {
    int key, position = 1;
    struct Node *temp = head;

    printf("Enter value to search: ");
    scanf("%d", &key);

    while (temp != NULL) {
        if (temp->data == key) {
            printf("Found at position %d.\\n", position);
            return;
        }
        temp = temp->next;
        position++;
    }
    printf("Value not found.\\n");
}

void displayForward(void) {
    struct Node *temp = head;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    printf("NULL <-> ");
    while (temp != NULL) {
        printf("%d <-> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

void displayBackward(void) {
    struct Node *temp = head;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    while (temp->next != NULL)
        temp = temp->next;

    printf("NULL <-> ");
    while (temp != NULL) {
        printf("%d <-> ", temp->data);
        temp = temp->prev;
    }
    printf("NULL\\n");
}

void freeList(void) {
    struct Node *temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

int main(void) {
    int choice;

    while (1) {
        printf("\\n--- DOUBLY LINKED LIST ---\\n");
        printf("1. Insert at beginning\\n");
        printf("2. Insert at end\\n");
        printf("3. Delete from beginning\\n");
        printf("4. Delete from end\\n");
        printf("5. Search\\n");
        printf("6. Display forward\\n");
        printf("7. Display backward\\n");
        printf("8. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input.\\n");
            break;
        }

        switch (choice) {
            case 1: insertBeginning(); break;
            case 2: insertEnd(); break;
            case 3: deleteBeginning(); break;
            case 4: deleteEnd(); break;
            case 5: searchNode(); break;
            case 6: displayForward(); break;
            case 7: displayBackward(); break;
            case 8: freeList(); return 0;
            default: printf("Invalid choice.\\n");
        }
    }

    freeList();
    return 0;
}`,
CLL: `// CIRCULAR LINKED LIST - complete menu-driven program
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *last = NULL;

void insertBeginning(void) {
    int value;
    struct Node *newNode;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;

    if (last == NULL) {
        last = newNode;
        newNode->next = newNode;
    } else {
        newNode->next = last->next;
        last->next = newNode;
    }
    printf("Node inserted.\\n");
}

void insertEnd(void) {
    int value;
    struct Node *newNode;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;

    if (last == NULL) {
        last = newNode;
        newNode->next = newNode;
    } else {
        newNode->next = last->next;
        last->next = newNode;
        last = newNode;
    }
    printf("Node inserted.\\n");
}

void deleteBeginning(void) {
    struct Node *first;

    if (last == NULL) {
        printf("List is empty.\\n");
        return;
    }

    first = last->next;

    if (first == last) {
        last = NULL;
    } else {
        last->next = first->next;
    }

    printf("Deleted value: %d\\n", first->data);
    free(first);
}

void deleteEnd(void) {
    struct Node *temp, *first;

    if (last == NULL) {
        printf("List is empty.\\n");
        return;
    }

    first = last->next;

    if (first == last) {
        printf("Deleted value: %d\\n", last->data);
        free(last);
        last = NULL;
        return;
    }

    temp = first;
    while (temp->next != last)
        temp = temp->next;

    temp->next = last->next;
    printf("Deleted value: %d\\n", last->data);
    free(last);
    last = temp;
}

void searchNode(void) {
    int key, position = 1;
    struct Node *temp;

    if (last == NULL) {
        printf("List is empty.\\n");
        return;
    }

    printf("Enter value to search: ");
    scanf("%d", &key);

    temp = last->next;
    do {
        if (temp->data == key) {
            printf("Found at position %d.\\n", position);
            return;
        }
        temp = temp->next;
        position++;
    } while (temp != last->next);

    printf("Value not found.\\n");
}

void display(void) {
    struct Node *temp;

    if (last == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = last->next;
    printf("HEAD -> ");
    do {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != last->next);
    printf("(back to HEAD)\\n");
}

void freeList(void) {
    struct Node *current, *nextNode;

    if (last == NULL)
        return;

    current = last->next;
    last->next = NULL;

    while (current != NULL) {
        nextNode = current->next;
        free(current);
        current = nextNode;
    }

    last = NULL;
}

int main(void) {
    int choice;

    while (1) {
        printf("\\n--- CIRCULAR LINKED LIST ---\\n");
        printf("1. Insert at beginning\\n");
        printf("2. Insert at end\\n");
        printf("3. Delete from beginning\\n");
        printf("4. Delete from end\\n");
        printf("5. Search\\n");
        printf("6. Display\\n");
        printf("7. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input.\\n");
            break;
        }

        switch (choice) {
            case 1: insertBeginning(); break;
            case 2: insertEnd(); break;
            case 3: deleteBeginning(); break;
            case 4: deleteEnd(); break;
            case 5: searchNode(); break;
            case 6: display(); break;
            case 7: freeList(); return 0;
            default: printf("Invalid choice.\\n");
        }
    }

    freeList();
    return 0;
}`,
DCLL: `// DOUBLY CIRCULAR LINKED LIST - complete menu-driven program
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};

struct Node *head = NULL;

void insertBeginning(void) {
    int value;
    struct Node *newNode, *last;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;

    if (head == NULL) {
        head = newNode;
        newNode->next = newNode;
        newNode->prev = newNode;
    } else {
        last = head->prev;
        newNode->next = head;
        newNode->prev = last;
        last->next = newNode;
        head->prev = newNode;
        head = newNode;
    }
    printf("Node inserted.\\n");
}

void insertEnd(void) {
    int value;
    struct Node *newNode, *last;

    printf("Enter value: ");
    scanf("%d", &value);

    newNode = (struct Node *)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    newNode->data = value;

    if (head == NULL) {
        head = newNode;
        newNode->next = newNode;
        newNode->prev = newNode;
    } else {
        last = head->prev;
        newNode->next = head;
        newNode->prev = last;
        last->next = newNode;
        head->prev = newNode;
    }
    printf("Node inserted.\\n");
}

void deleteBeginning(void) {
    struct Node *temp, *last;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = head;

    if (head->next == head) {
        head = NULL;
    } else {
        last = head->prev;
        head = head->next;
        head->prev = last;
        last->next = head;
    }

    printf("Deleted value: %d\\n", temp->data);
    free(temp);
}

void deleteEnd(void) {
    struct Node *last, *secondLast;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    last = head->prev;

    if (last == head) {
        head = NULL;
    } else {
        secondLast = last->prev;
        secondLast->next = head;
        head->prev = secondLast;
    }

    printf("Deleted value: %d\\n", last->data);
    free(last);
}

void searchNode(void) {
    int key, position = 1;
    struct Node *temp;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    printf("Enter value to search: ");
    scanf("%d", &key);

    temp = head;
    do {
        if (temp->data == key) {
            printf("Found at position %d.\\n", position);
            return;
        }
        temp = temp->next;
        position++;
    } while (temp != head);

    printf("Value not found.\\n");
}

void displayForward(void) {
    struct Node *temp;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = head;
    printf("HEAD <-> ");
    do {
        printf("%d <-> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(back to HEAD)\\n");
}

void displayBackward(void) {
    struct Node *temp;

    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }

    temp = head->prev;
    printf("TAIL <-> ");
    while (temp != head) {
        printf("%d <-> ", temp->data);
        temp = temp->prev;
    }
    printf("%d <-> (back to TAIL)\\n", head->data);
}

void freeList(void) {
    struct Node *current, *nextNode;

    if (head == NULL)
        return;

    current = head->next;
    while (current != head) {
        nextNode = current->next;
        free(current);
        current = nextNode;
    }

    free(head);
    head = NULL;
}

int main(void) {
    int choice;

    while (1) {
        printf("\\n--- DOUBLY CIRCULAR LINKED LIST ---\\n");
        printf("1. Insert at beginning\\n");
        printf("2. Insert at end\\n");
        printf("3. Delete from beginning\\n");
        printf("4. Delete from end\\n");
        printf("5. Search\\n");
        printf("6. Display forward\\n");
        printf("7. Display backward\\n");
        printf("8. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input.\\n");
            break;
        }

        switch (choice) {
            case 1: insertBeginning(); break;
            case 2: insertEnd(); break;
            case 3: deleteBeginning(); break;
            case 4: deleteEnd(); break;
            case 5: searchNode(); break;
            case 6: displayForward(); break;
            case 7: displayBackward(); break;
            case 8: freeList(); return 0;
            default: printf("Invalid choice.\\n");
        }
    }

    freeList();
    return 0;
}`
};


function makeNode(value,id){return {id,data:Number(value),address:0x1000+id*0x10,nextId:null,prevId:null};}
function relink(nodes,type){
 const copy=nodes.map(n=>({...n,nextId:null,prevId:null}));
 copy.forEach((n,i)=>{
  if(type==='DLL'||type==='DCLL') n.prevId=i>0?copy[i-1].id:(type==='DCLL'&&copy.length?copy[copy.length-1].id:null);
  n.nextId=i<copy.length-1?copy[i+1].id:(type==='CLL'||type==='DCLL'&&copy.length?copy[0]?.id:null);
 });
 return copy;
}
function walk(nodes,type){
 if(!nodes.length)return [];
 const map=new Map(nodes.map(n=>[n.id,n])), result=[], seen=new Set();
 let current=nodes.find(n=>n.prevId===null)?.id;
 if(current===undefined)current=nodes[0].id;
 while(current!=null&&!seen.has(current)&&result.length<=nodes.length){
  seen.add(current);const node=map.get(current);if(!node)break;result.push(node);current=node.nextId;
 }
 return result;
}
function addr(id,nodes){if(id==null)return 'NULL';const node=nodes.find(n=>n.id===id);return node?'0x'+node.address.toString(16).toUpperCase():'NULL';}
function App(){
 const [type,setType]=useState('SLL');
 const [nodes,setNodes]=useState(()=>relink(initialValues.map((v,i)=>makeNode(v,i+1)),'SLL'));
 const [nextId,setNextId]=useState(5);
 const [value,setValue]=useState('50');
 const [index,setIndex]=useState('1');
 const [searchValue,setSearchValue]=useState('25');
 const [section,setSection]=useState('visualizer');
 const [status,setStatus]=useState('Ready. Choose an operation.');
 const [highlight,setHighlight]=useState(null);
 const [pending,setPending]=useState(null);
 const [history,setHistory]=useState([]);
 const [future,setFuture]=useState([]);
 const [codeType,setCodeType]=useState('SLL');
 const [programType,setProgramType]=useState('SLL');
 const [programs,setPrograms]=useState(completePrograms);
 const [editableCode,setEditableCode]=useState(codeSnippets.SLL);
 const [quizIndex,setQuizIndex]=useState(0);
 const [quizScore,setQuizScore]=useState(0);
 const [quizAnswer,setQuizAnswer]=useState(null);
 const [completed,setCompleted]=useState(()=>JSON.parse(localStorage.getItem('llv3-progress')||'[]'));
 const [showMemory,setShowMemory]=useState(true);
 const [showPointers,setShowPointers]=useState(true);
 const [speed,setSpeed]=useState('normal');
 const [debugIndex,setDebugIndex]=useState(0);
 const [debugRevealed,setDebugRevealed]=useState(false);
 const [practiceAnswer,setPracticeAnswer]=useState('');
 const ordered=useMemo(()=>walk(nodes,type),[nodes,type]);
 const stats=useMemo(()=>({count:nodes.length,sum:nodes.reduce((s,n)=>s+n.data,0),average:nodes.length?(nodes.reduce((s,n)=>s+n.data,0)/nodes.length).toFixed(2):'—',min:nodes.length?Math.min(...nodes.map(n=>n.data)):'—',max:nodes.length?Math.max(...nodes.map(n=>n.data)):'—',unique:new Set(nodes.map(n=>n.data)).size}),[nodes]);
 useEffect(()=>localStorage.setItem('llv3-progress',JSON.stringify(completed)),[completed]);
 useEffect(()=>{setNodes(prev=>relink(prev,type));setHighlight(null);setPending(null);setStatus(`Switched to ${TYPES[type].name}.`);},[type]);
 const commit=(next,message)=>{
  setHistory(h=>[...h.slice(-29),nodes]);setFuture([]);setNodes(relink(next,type));setPending(null);setHighlight(null);setStatus(message);
 };
 const validNumber=()=>{const n=Number(value);if(value.trim()===''||!Number.isInteger(n)){setStatus('Enter a valid integer.');return null;}return n;};
 const validIndex=(allowEnd=false)=>{const n=Number(index);if(!Number.isInteger(n)||n<0||n>(allowEnd?nodes.length:nodes.length-1)){setStatus(`Index must be between 0 and ${allowEnd?nodes.length:Math.max(0,nodes.length-1)}.`);return null;}return n;};
 const begin=(next,steps,message,focus=null)=>{
  setPending({next:relink(next,type),steps,message,step:0,focus});
  setHighlight(focus);setStatus(steps[0]||'Operation ready.');
 };
 const stepForward=()=>{
  if(!pending)return;
  if(pending.step>=pending.steps.length-1){commit(pending.next,pending.message);return;}
  const s=pending.step+1;setPending({...pending,step:s});setHighlight(pending.focus);setStatus(pending.steps[s]);
 };
 const stepBack=()=>{if(!pending)return;const s=Math.max(0,pending.step-1);setPending({...pending,step:s});setStatus(pending.steps[s]);};
 const add=(where)=>{
  const n=validNumber();if(n===null)return;
  const newNode=makeNode(n,nextId);
  const arr=[...ordered];
  let at=where==='front'?0:where==='end'?arr.length:validIndex(true);
  if(at===null)return;
  arr.splice(at,0,newNode);setNextId(v=>v+1);
  const steps=at===0?['Allocate memory for the new node.','Store the data value in the new node.','Set the new node next pointer to the current HEAD.','Move HEAD to the new node.']:at===nodes.length?['Allocate memory for the new node.','Store the data value in the new node.','Connect the current last node to the new node.','Update the tail or circular link if required.']:['Allocate memory for the new node.','Find the node currently at this index.','Connect the new node to its neighbouring nodes.','Update neighbouring pointers.'];
  begin(arr,steps,`Inserted ${n} at index ${at}.`,newNode.id);
 };
 const remove=(where)=>{
  if(!ordered.length){setStatus('The list is empty.');return;}
  let at=where==='front'?0:where==='end'?ordered.length-1:validIndex();
  if(at===null)return;
  const removed=ordered[at],arr=ordered.filter((_,i)=>i!==at);
  const steps=['Locate the node to delete.','Reconnect the previous and next nodes.','Update HEAD or TAIL if the deleted node is at an end.','Release the deleted node memory using free().'];
  begin(arr,steps,`Deleted ${removed.data} from index ${at}.`,removed.id);
 };
 const deleteByValue=()=>{
  const n=Number(searchValue),at=ordered.findIndex(x=>x.data===n);
  if(at<0){setStatus(`${n} was not found.`);return;}
  const removed=ordered[at];begin(ordered.filter((_,i)=>i!==at),['Search from HEAD for the matching value.','Reconnect the neighbouring nodes.','Free the matching node.'],`Deleted value ${n}.`,removed.id);
 };
 const search=()=>{
  const n=Number(searchValue),at=ordered.findIndex(x=>x.data===n);
  setHighlight(at>=0?ordered[at].id:null);
  setStatus(at<0?`${n} was not found.`:`Found ${n} at position ${at+1}. Traversal checked ${at+1} node(s).`);
 };
 const simple=(arr,msg,steps)=>begin(arr,steps||['Prepare the operation.','Update the node links.','Verify the new list structure.'],msg);
 const reverse=()=>simple([...ordered].reverse(),'List reversed.',['Start at HEAD.','Reverse the direction of each next link.','For DLL, reverse each prev link as well.','Update HEAD and TAIL.']);
 const sort=()=>simple([...ordered].sort((a,b)=>a.data-b.data),'List sorted in ascending order.',['Compare node data values.','Rearrange nodes into ascending order.','Reconnect the pointer links.']);
 const removeDuplicates=()=>simple(ordered.filter((n,i,a)=>a.findIndex(x=>x.data===n.data)===i),'Duplicate values removed.',['Scan the list from HEAD.','Keep the first occurrence of each value.','Remove repeated nodes and reconnect links.']);
 const updateNode=()=>{const n=validNumber();if(n===null)return;const at=validIndex();if(at===null)return;const arr=ordered.map((x,i)=>i===at?{...x,data:n}:x);simple(arr,`Updated node at index ${at} to ${n}.`);};
 const rotate=()=>{if(!ordered.length)return;const k=((Number(index)||0)%ordered.length+ordered.length)%ordered.length;const rotated=k===0?[...ordered]:[...ordered.slice(-k),...ordered.slice(0,-k)];simple(rotated,`Rotated right by ${k}.`);};
 const findMiddle=()=>{if(!ordered.length)return;const at=Math.floor((ordered.length-1)/2);setHighlight(ordered[at].id);setStatus(`Middle node is ${ordered[at].data} at index ${at}.`);};
 const nthFromEnd=()=>{const n=Number(index);if(!Number.isInteger(n)||n<1||n>ordered.length){setStatus(`Enter N between 1 and ${ordered.length}.`);return;}const node=ordered[ordered.length-n];setHighlight(node.id);setStatus(`${n}th node from end is ${node.data}.`);};
 const palindrome=()=>setStatus(ordered.every((n,i)=>n.data===ordered[ordered.length-1-i]?.data)?'The list is a palindrome.':'The list is not a palindrome.');
 const swapPairs=()=>{const arr=[...ordered];for(let i=0;i<arr.length-1;i+=2)[arr[i],arr[i+1]]=[arr[i+1],arr[i]];simple(arr,'Adjacent node pairs swapped.');};
 const traverse=()=>{if(!ordered.length)return;const steps=ordered.map((n,i)=>`TEMP visits node ${n.data} at address ${addr(n.id,nodes)} (step ${i+1}/${ordered.length}).`);begin(ordered,steps,'Traversal completed. TEMP reached the stopping condition.',ordered[0].id);};
 const undo=()=>{if(!history.length)return;const prev=history[history.length-1];setFuture(f=>[nodes,...f]);setHistory(h=>h.slice(0,-1));setNodes(relink(prev,type));setPending(null);setStatus('Undo successful.');};
 const redo=()=>{if(!future.length)return;const next=future[0];setHistory(h=>[...h,nodes]);setFuture(f=>f.slice(1));setNodes(relink(next,type));setPending(null);setStatus('Redo successful.');};
 const clear=()=>{if(!nodes.length)return;commit([],'All nodes cleared.');};
 const exportJSON=()=>download(JSON.stringify({type,nodes:ordered.map(n=>({data:n.data,address:addr(n.id,nodes)}))},null,2),`linked-list-${type}.json`,'application/json');
 const download=(data,name,mime)=>{const a=document.createElement('a'),url=URL.createObjectURL(new Blob([data],{type:mime}));a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);};
 const importJSON=async e=>{const file=e.target.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text()),arr=Array.isArray(data)?data:data.nodes.map(n=>n.data);if(!Array.isArray(arr)||arr.length>100||!arr.every(Number.isInteger))throw Error();const fresh=arr.map((v,i)=>makeNode(v,nextId+i));setNextId(v=>v+arr.length);commit(fresh,`Imported ${arr.length} nodes.`);}catch{setStatus('Invalid JSON file. Expected an array of integers or exported list JSON.');}e.target.value='';};
 const markComplete=id=>setCompleted(p=>p.includes(id)?p:[...p,id]);
 const downloadCode=(code,name)=>download(code,name,'text/plain');
 const copy=async code=>{try{await navigator.clipboard.writeText(code);setStatus('Code copied to clipboard.');}catch{setStatus('Clipboard permission is unavailable.');}};
 const answerQuiz=i=>{if(quizAnswer!==null)return;setQuizAnswer(i);if(i===quizzes[quizIndex].answer){setQuizScore(s=>s+1);markComplete('quiz');}};
 const nextQuiz=()=>{setQuizIndex(i=>(i+1)%quizzes.length);setQuizAnswer(null);};
 const nodeMap=new Map(nodes.map(n=>[n.id,n]));
 const menu=[['visualizer','Visualizer',Activity],['memory','Memory lab',MemoryStick],['operations','Operations',Zap],['programs','C programs',Code2],['playground','Code workspace',FileCode],['debug','Debugging lab',Bug],['learn','DSA learning',BookOpen],['exam','Exam centre',GraduationCap],['progress','Progress',Trophy]];
 return <div className="app">
  <header className="topbar"><div className="brand"><div className="brand-mark"><GitBranch/></div><div><b>Linked List Lab <em>v3</em></b><small>Complete DSA learning platform</small></div></div><div className="top-right"><span className="online"><i/>Interactive workspace</span><button className="small-icon" onClick={()=>setSection('progress')} title="Progress"><Trophy size={17}/></button></div></header>
  <div className="layout">
   <aside className="sidebar"><div className="side-label">LEARNING WORKSPACE</div>{menu.map(([id,label,Icon])=><button key={id} className={section===id?'nav active':'nav'} onClick={()=>setSection(id)}><Icon size={17}/><span>{label}</span>{section===id&&<ChevronRight size={14}/>}</button>)}<div className="sidebar-bottom"><div className="progress-mini"><span>Learning progress</span><b>{completed.length}/4</b><div><i style={{width:`${Math.min(100,completed.length/4*100)}%`}}/></div></div><small>React + Vite · Local-first</small></div></aside>
   <main className="main">
    {section==='visualizer'&&<><div className="page-heading"><div><span className="kicker">VISUAL LEARNING</span><h1>Linked List Visualizer</h1><p>Explore node connections, pointer fields and simulated memory addresses.</p></div><div className="heading-actions"><button className="ghost" onClick={undo} disabled={!history.length}><Undo2 size={15}/>Undo</button><button className="ghost" onClick={redo} disabled={!future.length}><Redo2 size={15}/>Redo</button></div></div>
     <div className="type-row">{Object.keys(TYPES).map(k=><button key={k} className={type===k?'type active':'type'} onClick={()=>setType(k)}><b>{k}</b><span>{TYPES[k].name}</span></button>)}</div>
     <div className="visual-grid"><section className="panel control-panel"><div className="panel-title"><div><span className="kicker">OPERATIONS</span><h2>Control centre</h2></div><Settings2 size={18}/></div><label>Node value</label><div className="inline"><input value={value} type="number" onChange={e=>setValue(e.target.value)}/><button className="primary" onClick={()=>add('end')}><Plus size={15}/>Add</button></div><div className="control-buttons"><button onClick={()=>add('front')}>Insert front</button><button onClick={()=>add('end')}>Insert end</button><button onClick={()=>add('index')}>Insert at index</button><button onClick={()=>remove('front')}>Delete front</button><button onClick={()=>remove('end')}>Delete end</button><button onClick={()=>remove('index')}>Delete at index</button></div><label>Index / N</label><input type="number" value={index} onChange={e=>setIndex(e.target.value)}/><div className="control-buttons two"><button onClick={reverse}><RotateCcw size={14}/>Reverse</button><button onClick={traverse}><ArrowRight size={14}/>Traverse</button><button onClick={findMiddle}>Find middle</button><button onClick={nthFromEnd}>Nth from end</button></div><label>Search / delete value</label><div className="inline"><input type="number" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/><button className="secondary" onClick={search}><Search size={14}/>Find</button></div><button className="wide-danger" onClick={deleteByValue}>Delete matching value</button></section>
      <section className="panel visual-panel"><div className="panel-title"><div><span className="kicker">LIVE STRUCTURE</span><h2>{TYPES[type].name}</h2><p>{TYPES[type].description}</p></div><div className="view-options"><label><input type="checkbox" checked={showMemory} onChange={e=>setShowMemory(e.target.checked)}/>Addresses</label><label><input type="checkbox" checked={showPointers} onChange={e=>setShowPointers(e.target.checked)}/>Pointers</label><button className="small-icon" onClick={clear} title="Clear list"><Trash2 size={16}/></button></div></div>
       <div className="diagram"><span className="head-tag">HEAD → {ordered.length?addr(ordered[0].id,nodes):'NULL'}</span>{!ordered.length?<div className="empty"><GitBranch size={34}/><b>No nodes yet</b><span>Insert a node to begin.</span></div>:<div className="diagram-scroll"><div className={`node-flow ${type}`}>{ordered.map((node,i)=><React.Fragment key={node.id}><div className={`node-block ${highlight===node.id?'focused':''}`}><div className="node-top"><span>NODE {i+1}</span><span>{node.id}</span></div><div className={`node-fields ${type==='DLL'||type==='DCLL'?'three':''}`}>{(type==='DLL'||type==='DCLL')&&<div className="field pointer"><small>PREV</small><b>{showPointers?addr(node.prevId,nodes):'•••'}</b></div>}<div className="field data"><small>DATA</small><b>{node.data}</b></div><div className="field pointer"><small>NEXT</small><b>{showPointers?addr(node.nextId,nodes):'•••'}</b></div></div>{showMemory&&<div className="address">ADDR: 0x{node.address.toString(16).toUpperCase()}</div>}</div>{i<ordered.length-1&&<div className="connector"><span/><ArrowRight size={18}/>{(type==='DLL'||type==='DCLL')&&<small>↔</small>}</div>}</React.Fragment>)}</div></div>}{(type==='CLL'||type==='DCLL')&&ordered.length>0&&<div className="circular-link"><span>TAIL.next → HEAD</span><b>↶</b></div>}</div>
       <div className="legend"><span><i className="cyan"/>Data field</span><span><i className="purple"/>Pointer field</span><span><i className="green"/>Selected node</span><span className="node-count">{nodes.length} nodes</span></div>
       <div className="status"><i/>{status}</div>
       {pending&&<div className="step-player"><div className="step-top"><b>Operation walkthrough</b><span>Step {pending.step+1} / {pending.steps.length}</span></div><p>{pending.steps[pending.step]}</p><div className="step-controls"><button className="ghost" onClick={stepBack} disabled={pending.step===0}><SkipBack size={14}/>Previous</button><div className="step-dots">{pending.steps.map((_,i)=><i key={i} className={i<=pending.step?'done':''}/>)}</div><button className="primary" onClick={stepForward}>{pending.step===pending.steps.length-1?'Apply changes':'Next step'}<SkipForward size={14}/></button></div></div>}
      </section></div>
     <div className="bottom-grid"><section className="panel compact-panel"><div className="panel-title"><h2>Quick tools</h2><span className="kicker">STRUCTURE</span></div><div className="quick-grid"><button onClick={sort}>Sort ascending</button><button onClick={removeDuplicates}>Remove duplicates</button><button onClick={rotate}>Rotate right</button><button onClick={swapPairs}>Swap adjacent pairs</button><button onClick={palindrome}>Palindrome check</button><button onClick={updateNode}>Update at index</button></div></section><section className="panel compact-panel"><div className="panel-title"><h2>List statistics</h2><span className="kicker">LIVE DATA</span></div><div className="stats">{Object.entries(stats).map(([k,v])=><div key={k}><small>{k}</small><b>{v}</b></div>)}</div><div className="transfer"><button onClick={exportJSON}><Download size={14}/>Export JSON</button><label><FileUp size={14}/>Import JSON<input type="file" accept=".json,application/json" onChange={importJSON}/></label></div></section></div>
    </>}
    {section==='memory'&&<><PageTitle kicker="POINTERS & MEMORY" title="Memory Lab" subtitle="Inspect simulated addresses, pointer targets and allocation status."/><div className="memory-summary"><Metric label="Allocated nodes" value={nodes.length}/><Metric label="Simulated memory" value={`${nodes.length*16} bytes`}/><Metric label="HEAD address" value={ordered.length?addr(ordered[0].id,nodes):'NULL'}/><Metric label="TAIL address" value={ordered.length?addr(ordered[ordered.length-1].id,nodes):'NULL'}/></div><section className="panel table-panel"><h2>Node memory map</h2><div className="table-scroll"><table><thead><tr><th>Node ID</th><th>Address</th><th>Data</th><th>Prev address</th><th>Next address</th><th>Status</th></tr></thead><tbody>{ordered.map(n=><tr key={n.id}><td>{n.id}</td><td className="mono">0x{n.address.toString(16).toUpperCase()}</td><td>{n.data}</td><td className="mono">{addr(n.prevId,nodes)}</td><td className="mono">{addr(n.nextId,nodes)}</td><td><span className="allocated">Allocated</span></td></tr>)}</tbody></table></div><p className="muted-note">These are simulated addresses for learning. JavaScript does not expose the real memory addresses of its objects. In a C program, malloc() returns the actual address for each allocated node.</p></section><section className="panel memory-explain"><h2>How to read the memory map</h2><ul><li><b>ADDR:</b> the illustrative location of this node.</li><li><b>PREV:</b> address of the previous node, or NULL when there is no previous node.</li><li><b>NEXT:</b> address of the next node. In circular lists, the tail points back to HEAD.</li><li><b>free():</b> removes an allocated node from the C program's memory.</li></ul></section></>}
    {section==='operations'&&<><PageTitle kicker="PRACTICE OPERATIONS" title="Operations Lab" subtitle="Try common and advanced linked-list operations with guided pointer steps."/><div className="operation-cards">{[['Insert before / after','Choose a value and position, then connect a new node.'],['Delete by value','Search for a value, unlink the node and release memory.'],['Reverse list','Reverse next links and, for DLL, previous links.'],['Merge / concatenate','Join two sorted or unsorted lists.'],['Split list','Divide a list into two parts at a selected position.'],['Cycle detection','Use slow and fast pointers to detect a loop.'],['Intersection','Find the first common node shared by two lists.'],['Reverse in groups','Reverse consecutive groups of K nodes.']].map(([a,b],i)=><div className="panel operation-card" key={a}><span className="op-number">0{i+1}</span><h3>{a}</h3><p>{b}</p><span className="coming">Planned extension</span></div>)}</div><section className="panel"><h2>Available now in Visualizer</h2><p className="muted-note">Insert at beginning, end or index; delete at beginning, end or index; search; delete by value; update; reverse; sort; remove duplicates; rotate; find middle; Nth from end; palindrome check; pair swapping and traversal walkthrough.</p><button className="primary" onClick={()=>setSection('visualizer')}>Open visualizer <ArrowRight size={15}/></button></section></>}
    {section==='programs'&&<><PageTitle kicker="C LANGUAGE LIBRARY" title="Complete C Programs" subtitle="Full menu-driven programs for all four linked-list types."/><div className="program-tabs">{Object.keys(TYPES).map(k=><button key={k} className={programType===k?'selected':''} onClick={()=>setProgramType(k)}>{k}<small>{TYPES[k].name}</small></button>)}</div><section className="panel code-panel"><div className="code-header"><div><b>{TYPES[programType].name}</b><small>Complete menu-driven C program</small></div><div><button className="ghost" onClick={()=>copy(programs[programType])}><Copy size={14}/>Copy</button><button className="primary" onClick={()=>downloadCode(programs[programType],programType.toLowerCase()+'_linked_list.c')}><Download size={14}/>Download .c</button></div></div><pre><code>{programs[programType]}</code></pre></section><p className="muted-note">Programs include node creation, insertion, deletion, searching, display and memory cleanup. The DLL and DCLL programs also demonstrate backward traversal.</p></>}
    {section==='playground'&&<><PageTitle kicker="PRACTICAL CODING" title="C Code Workspace" subtitle="Edit, copy and download C examples. Compile locally with GCC or an online C compiler."/><div className="program-tabs">{Object.keys(TYPES).map(k=><button key={k} className={codeType===k?'selected':''} onClick={()=>{setCodeType(k);setEditableCode(codeSnippets[k]);}}>{k}<small>{TYPES[k].name}</small></button>)}</div><section className="panel editor-panel"><div className="code-header"><div><b>{TYPES[codeType].name} · insertion example</b><small>Editable C source</small></div><div><button className="ghost" onClick={()=>copy(editableCode)}><Copy size={14}/>Copy</button><button className="primary" onClick={()=>downloadCode(editableCode,codeType.toLowerCase()+'_example.c')}><Download size={14}/>Download</button></div></div><textarea spellCheck="false" value={editableCode} onChange={e=>setEditableCode(e.target.value)}/><div className="editor-hint"><Cpu size={16}/>This workspace edits source code but does not execute C inside the browser yet. Download the file and compile using <code>gcc filename.c -o program</code>.</div></section><section className="panel"><h2>Compile on your computer</h2><pre className="terminal">gcc linked_list.c -o linked_list{"\\n"}./linked_list</pre></section></>}
    {section==='debug'&&<><PageTitle kicker="LEARN FROM MISTAKES" title="Pointer Debugging Lab" subtitle="Understand common linked-list bugs, why they happen and how to fix them."/><div className="debug-layout"><div className="debug-list">{debugCases.map((d,i)=><button className={debugIndex===i?'selected':''} key={d.title} onClick={()=>{setDebugIndex(i);setDebugRevealed(false);}}><ShieldAlert size={16}/>{d.title}</button>)}</div><section className="panel debug-card"><span className="kicker">DEBUG CHALLENGE {debugIndex+1}/{debugCases.length}</span><h2>{debugCases[debugIndex].title}</h2><div className="bug-block"><b>What you observe</b><p>{debugCases[debugIndex].symptom}</p></div><label className="field-label">What is the likely cause?</label><textarea className="answer-box" placeholder="Write your diagnosis..." value={practiceAnswer} onChange={e=>setPracticeAnswer(e.target.value)}/><button className="primary" onClick={()=>setDebugRevealed(true)}>Reveal explanation</button>{debugRevealed&&<div className="solution"><b>Likely cause</b><p>{debugCases[debugIndex].cause}</p><b>How to fix it</b><p>{debugCases[debugIndex].fix}</p></div>}</section></div></>}
    {section==='learn'&&<><PageTitle kicker="DSA KNOWLEDGE" title="DSA Learning Centre" subtitle="Understand linked-list concepts, algorithms and complexity."/><div className="learning-cards"><article className="panel"><BookOpen/><h3>Core concepts</h3><p>Node, data, pointer, head, tail, NULL, dynamic memory, traversal and linked-list variations.</p><button className="ghost" onClick={()=>markComplete('concepts')}>{completed.includes('concepts')?'Completed':'Mark complete'} <Check size={14}/></button></article><article className="panel"><Gauge/><h3>Time complexity</h3><p>Compare common operations for SLL, DLL, CLL and DCLL.</p><button className="ghost" onClick={()=>markComplete('complexity')}>{completed.includes('complexity')?'Completed':'Mark complete'} <Check size={14}/></button></article><article className="panel"><Layers/><h3>Advanced algorithms</h3><p>Floyd cycle detection, merge sort, fast/slow pointers and reversing in groups.</p><button className="ghost" onClick={()=>markComplete('advanced')}>{completed.includes('advanced')?'Completed':'Mark complete'} <Check size={14}/></button></article></div><section className="panel table-panel"><h2>Complexity comparison</h2><div className="table-scroll"><table><thead><tr><th>Operation</th><th>SLL</th><th>DLL</th><th>CLL</th><th>DCLL</th></tr></thead><tbody>{complexity.map(row=><tr key={row[0]}>{row.map((x,i)=><td key={i} className={i?'mono':''}>{x}</td>)}</tr>)}</tbody></table></div><p className="muted-note">* O(1) assumes a maintained tail pointer. Without a tail pointer, insertion at the end generally requires O(n) traversal.</p></section></>}
    {section==='exam'&&<><PageTitle kicker="TEST YOUR KNOWLEDGE" title="Exam Centre" subtitle="Practise MCQs, pointer concepts and common examination questions."/><div className="exam-stats"><Metric label="Questions" value={quizzes.length}/><Metric label="Your score" value={quizScore}/><Metric label="Correct answers" value={quizScore}/></div><section className="panel quiz-panel"><div className="quiz-top"><span>QUESTION {quizIndex+1} / {quizzes.length}</span><span>{quizScore} correct</span></div><h2>{quizzes[quizIndex].q}</h2><div className="answers">{quizzes[quizIndex].options.map((o,i)=><button key={o} disabled={quizAnswer!==null} className={quizAnswer===null?'':i===quizzes[quizIndex].answer?'correct':i===quizAnswer?'wrong':''} onClick={()=>answerQuiz(i)}><b>{String.fromCharCode(65+i)}</b>{o}</button>)}</div>{quizAnswer!==null&&<div className="solution"><b>{quizAnswer===quizzes[quizIndex].answer?'Correct!':'Not quite.'}</b><p>{quizzes[quizIndex].why}</p></div>}<div className="quiz-actions"><button className="ghost" onClick={()=>{setQuizIndex(0);setQuizAnswer(null);setQuizScore(0);}}>Reset quiz</button><button className="primary" disabled={quizAnswer===null} onClick={nextQuiz}>Next question <ArrowRight size={14}/></button></div></section></>}
    {section==='progress'&&<><PageTitle kicker="YOUR LEARNING" title="Progress Dashboard" subtitle="Your progress is saved locally in this browser."/><div className="progress-hero"><div className="progress-ring"><b>{Math.round(completed.length/4*100)}%</b></div><div><h2>Keep building your DSA skills</h2><p>{completed.length} of 4 learning milestones completed.</p><div className="progress-track"><i style={{width:`${Math.min(100,completed.length/4*100)}%`}}/></div></div></div><div className="milestones">{[['concepts','Core concepts'],['complexity','Complexity comparison'],['advanced','Advanced algorithms'],['quiz','Exam practice']].map(([id,label])=><div key={id}><span>{completed.includes(id)?<Check size={16}/>:<CircleHelp size={16}/>}</span><b>{label}</b><small>{completed.includes(id)?'Completed':'Not completed'}</small></div>)}</div><button className="ghost" onClick={()=>{setCompleted([]);setQuizScore(0);}}>Reset learning progress</button></>}
    <footer>Linked List Lab v3 <span>•</span> React + Vite <span>•</span> Progress and list data stay in this browser.</footer>
   </main>
  </div>
 </div>;
}
function PageTitle({kicker,title,subtitle}){return <div className="page-heading"><div><span className="kicker">{kicker}</span><h1>{title}</h1><p>{subtitle}</p></div></div>}
function Metric({label,value}){return <div className="panel metric"><small>{label}</small><b>{value}</b></div>}
export default App;
