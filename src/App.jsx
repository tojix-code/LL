import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
 Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen, Bug, Check,
 ChevronLeft, ChevronRight, CircleHelp, Code2, Copy, Download, FileUp,
 Gauge, GitBranch, GraduationCap, Layers, List, MemoryStick, Plus,
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
const milestones=[
 ['concepts','Core concepts'],
 ['complexity','Complexity comparison'],
 ['visualizer','Try a visualizer operation'],
 ['debugging','Pointer debugging'],
 ['quiz','Finish the quiz']
];
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
 const diagramScrollRef=useRef(null);
 const [history,setHistory]=useState([]);
 const [future,setFuture]=useState([]);
 const [programType,setProgramType]=useState('SLL');
 const [quizIndex,setQuizIndex]=useState(0);
 const [quizScore,setQuizScore]=useState(0);
 const [quizAnswer,setQuizAnswer]=useState(null);
 const [quizAnswered,setQuizAnswered]=useState(0);
 const [quizFinished,setQuizFinished]=useState(false);
 const [completed,setCompleted]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem('llv3-progress')||'[]');return Array.isArray(saved)?saved.filter(id=>milestones.some(([milestone])=>milestone===id)):[];}catch{return [];}});
 const [showMemory,setShowMemory]=useState(true);
 const [showPointers,setShowPointers]=useState(true);
 const [speed,setSpeed]=useState('normal');
 const [debugIndex,setDebugIndex]=useState(0);
 const [debugRevealed,setDebugRevealed]=useState(false);
 const [practiceAnswer,setPracticeAnswer]=useState('');
 const ordered=useMemo(()=>walk(nodes,type),[nodes,type]);
 const stats=useMemo(()=>({count:nodes.length,sum:nodes.reduce((s,n)=>s+n.data,0),average:nodes.length?(nodes.reduce((s,n)=>s+n.data,0)/nodes.length).toFixed(2):'—',min:nodes.length?Math.min(...nodes.map(n=>n.data)):'—',max:nodes.length?Math.max(...nodes.map(n=>n.data)):'—',unique:new Set(nodes.map(n=>n.data)).size}),[nodes]);
 useEffect(()=>{try{localStorage.setItem('llv3-progress',JSON.stringify(completed));}catch{setStatus('Progress could not be saved in this browser.');}},[completed]);
 useEffect(()=>{setNodes(prev=>relink(prev,type));setHighlight(null);setPending(null);setStatus(`Switched to ${TYPES[type].name}.`);},[type]);
 const commit=(next,message)=>{
  setHistory(h=>[...h.slice(-29),nodes]);setFuture([]);setNodes(relink(next,type));setPending(null);setHighlight(null);setStatus(message);
  if(JSON.stringify(next.map(n=>n.id))!==JSON.stringify(nodes.map(n=>n.id))||next.some((n,i)=>n.data!==nodes[i]?.data))markComplete('visualizer');
 };
 const validNumber=()=>{const n=Number(value);if(value.trim()===''||!Number.isInteger(n)){setStatus('Enter a valid integer.');return null;}return n;};
 const validIndex=(allowEnd=false)=>{const n=Number(index);if(!Number.isInteger(n)||n<0||n>(allowEnd?nodes.length:nodes.length-1)){setStatus(`Index must be between 0 and ${allowEnd?nodes.length:Math.max(0,nodes.length-1)}.`);return null;}return n;};
 const begin=(next,steps,message,focus=null)=>{
  setPending({next:relink(next,type),steps,message,step:0,focus,stepFocus:null});
  setHighlight(focus);setStatus(steps[0]||'Operation ready.');
 };
 const stepForward=()=>{
  if(!pending)return;
  if(pending.step>=pending.steps.length-1){commit(pending.next,pending.message);return;}
  const s=pending.step+1,focus=pending.stepFocus?.[s]??pending.focus;setPending({...pending,step:s});setHighlight(focus);setStatus(pending.steps[s]);
 };
 const stepBack=()=>{if(!pending)return;const s=Math.max(0,pending.step-1),focus=pending.stepFocus?.[s]??pending.focus;setPending({...pending,step:s});setHighlight(focus);setStatus(pending.steps[s]);};
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
 const traverse=()=>{if(!ordered.length)return;const steps=[...ordered.map((n,i)=>`TEMP follows HEAD to node ${n.data} at address ${addr(n.id,nodes)} (node ${i+1} of ${ordered.length}).`),type==='CLL'||type==='DCLL'?'TEMP follows the final link back to HEAD.':'TEMP follows NULL and traversal stops.'];const focuses=[...ordered.map(n=>n.id),ordered[ordered.length-1].id];setPending({next:relink(ordered,type),steps,message:'Traversal completed.',step:0,focus:ordered[0].id,stepFocus:focuses});setHighlight(ordered[0].id);setStatus(steps[0]);};
 const undo=()=>{if(!history.length)return;const prev=history[history.length-1];setFuture(f=>[nodes,...f]);setHistory(h=>h.slice(0,-1));setNodes(relink(prev,type));setPending(null);setStatus('Undo successful.');};
 const redo=()=>{if(!future.length)return;const next=future[0];setHistory(h=>[...h,nodes]);setFuture(f=>f.slice(1));setNodes(relink(next,type));setPending(null);setStatus('Redo successful.');};
 const clear=()=>{if(!nodes.length)return;commit([],'All nodes cleared.');};
 const exportJSON=()=>download(JSON.stringify({type,nodes:ordered.map(n=>({data:n.data,address:addr(n.id,nodes)}))},null,2),`linked-list-${type}.json`,'application/json');
 const download=(data,name,mime)=>{const a=document.createElement('a'),url=URL.createObjectURL(new Blob([data],{type:mime}));a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);};
 const importJSON=async e=>{const file=e.target.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text()),arr=Array.isArray(data)?data:data.nodes.map(n=>n.data);if(!Array.isArray(arr)||arr.length>100||!arr.every(Number.isInteger))throw Error();const fresh=arr.map((v,i)=>makeNode(v,nextId+i));setNextId(v=>v+arr.length);commit(fresh,`Imported ${arr.length} nodes.`);}catch{setStatus('Invalid JSON file. Expected an array of integers or exported list JSON.');}e.target.value='';};
 const markComplete=id=>setCompleted(p=>p.includes(id)?p:[...p,id]);
 const copy=async code=>{try{await navigator.clipboard.writeText(code);setStatus('Code copied to clipboard.');}catch{setStatus('Clipboard permission is unavailable.');}};
 const answerQuiz=i=>{if(quizAnswer!==null||quizFinished)return;setQuizAnswer(i);setQuizAnswered(n=>n+1);if(i===quizzes[quizIndex].answer)setQuizScore(s=>s+1);};
 const nextQuiz=()=>{if(quizIndex===quizzes.length-1){setQuizFinished(true);markComplete('quiz');return;}setQuizIndex(i=>i+1);setQuizAnswer(null);};
 const resetQuiz=()=>{setQuizIndex(0);setQuizAnswer(null);setQuizScore(0);setQuizAnswered(0);setQuizFinished(false);};
 const displayedNodes=pending&&pending.step===pending.steps.length-1?pending.next:nodes;
 const displayedOrdered=walk(displayedNodes,type);
 const scrollDiagram=direction=>{const diagram=diagramScrollRef.current;if(diagram)diagram.scrollBy({left:direction*diagram.clientWidth*.75,behavior:'smooth'});};
 const menu=[['visualizer','Visualizer',Activity],['memory','Memory lab',MemoryStick],['operations','Operations',Zap],['programs','C programs',Code2],['debug','Debugging lab',Bug],['learn','DSA learning',BookOpen],['exam','Exam centre',GraduationCap],['progress','Progress',Trophy]];
 return <div className="app">
  <header className="topbar"><div className="brand"><div className="brand-mark"><GitBranch/></div><div><b>Linked List Lab <em>v3</em></b><small>Guided DSA learning</small></div></div><div className="top-right"><span className="online"><i/>Interactive workspace</span><button className="small-icon" onClick={()=>setSection('progress')} title="Progress" aria-label="Open learning progress"><Trophy size={17}/></button></div></header>
  <div className="layout">
   <aside className="sidebar"><div className="side-label">LEARNING WORKSPACE</div>{menu.map(([id,label,Icon])=><button key={id} className={section===id?'nav active':'nav'} aria-current={section===id?'page':undefined} onClick={()=>setSection(id)}><Icon size={17}/><span>{label}</span>{section===id&&<ChevronRight size={14}/>}</button>)}<div className="sidebar-bottom"><div className="progress-mini"><span>Learning progress</span><b>{completed.length}/{milestones.length}</b><div><i style={{width:`${Math.min(100,completed.length/milestones.length*100)}%`}}/></div></div><small>React + Vite · Local-first</small></div></aside>
   <main className="main"><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status}</div>
    {section==='visualizer'&&<><div className="page-heading"><div><span className="kicker">VISUAL LEARNING</span><h1>Linked List Visualizer</h1><p>Explore node connections, pointer fields and simulated memory addresses.</p></div><div className="heading-actions"><button className="ghost" onClick={undo} disabled={!history.length}><Undo2 size={15}/>Undo</button><button className="ghost" onClick={redo} disabled={!future.length}><Redo2 size={15}/>Redo</button></div></div>
     {completed.length<milestones.length&&<section className="panel learning-path" aria-label="Guided learning path"><div><span className="kicker">A GOOD PLACE TO START</span><h2>Learn it, see it, practise it</h2><p>Follow these five short steps. Your progress is saved in this browser.</p></div><div className="path-steps"><div className={completed.includes('concepts')?'path-step complete':'path-step'}><span>1</span><div><b>Learn the basics</b><small>{completed.includes('concepts')?'Lesson completed':'A short introduction to nodes and links'}</small></div><button className="ghost" onClick={()=>setSection('learn')}>{completed.includes('concepts')?'Review lesson':'Start lesson'} <ArrowRight size={14}/></button></div><div className={completed.includes('complexity')?'path-step complete':'path-step'}><span>2</span><div><b>Understand the costs</b><small>{completed.includes('complexity')?'Lesson completed':'Learn why some operations take longer'}</small></div><button className="ghost" onClick={()=>setSection('learn')}>Read lesson <ArrowRight size={14}/></button></div><div className={completed.includes('visualizer')?'path-step complete':'path-step'}><span>3</span><div><b>Try a pointer change</b><small>{completed.includes('visualizer')?'Operation completed':'Insert or remove a node in the diagram'}</small></div><button className="ghost" onClick={()=>document.getElementById('control-panel')?.scrollIntoView({behavior:'smooth',block:'center'})}>Go to controls <ArrowRight size={14}/></button></div><div className={completed.includes('debugging')?'path-step complete':'path-step'}><span>4</span><div><b>Diagnose a pointer bug</b><small>{completed.includes('debugging')?'Challenge completed':'Try a debugging challenge'}</small></div><button className="ghost" onClick={()=>setSection('debug')}>Open lab <ArrowRight size={14}/></button></div><div className={completed.includes('quiz')?'path-step complete':'path-step'}><span>5</span><div><b>Check your understanding</b><small>{completed.includes('quiz')?'Quiz completed':'Answer the five-question quiz'}</small></div><button className="ghost" onClick={()=>setSection('exam')}>Take the quiz <ArrowRight size={14}/></button></div></div></section>}
     <div className="type-row" aria-label="Choose a linked-list type">{Object.keys(TYPES).map(k=><button key={k} className={type===k?'type active':'type'} aria-pressed={type===k} onClick={()=>setType(k)}><b>{k}</b><span>{TYPES[k].name}</span></button>)}</div>
     <div className="visual-grid"><section className="panel control-panel" id="control-panel"><div className="panel-title"><div><span className="kicker">OPERATIONS</span><h2>Control centre</h2></div><Settings2 size={18}/></div><label htmlFor="node-value">Node value</label><div className="inline"><input id="node-value" value={value} type="number" onChange={e=>setValue(e.target.value)}/><button className="primary" onClick={()=>add('end')}><Plus size={15}/>Add</button></div><div className="control-buttons"><button onClick={()=>add('front')}>Insert front</button><button onClick={()=>add('end')}>Insert end</button><button onClick={()=>add('index')}>Insert at index</button><button onClick={()=>remove('front')}>Delete front</button><button onClick={()=>remove('end')}>Delete end</button><button onClick={()=>remove('index')}>Delete at index</button></div><label htmlFor="node-index">Index / N</label><input id="node-index" type="number" value={index} onChange={e=>setIndex(e.target.value)}/><div className="control-buttons two"><button onClick={reverse}><RotateCcw size={14}/>Reverse</button><button onClick={traverse}><ArrowRight size={14}/>Traverse</button><button onClick={findMiddle}>Find middle</button><button onClick={nthFromEnd}>Nth from end</button></div><label htmlFor="search-value">Search / delete value</label><div className="inline"><input id="search-value" type="number" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/><button className="secondary" onClick={search}><Search size={14}/>Find</button></div><button className="wide-danger" onClick={deleteByValue}>Delete matching value</button></section>
      <section className="panel visual-panel"><div className="panel-title"><div><span className="kicker">LIVE STRUCTURE</span><h2>{TYPES[type].name}</h2><p>{TYPES[type].description}</p></div><div className="view-options"><label><input type="checkbox" checked={showMemory} onChange={e=>setShowMemory(e.target.checked)}/>Addresses</label><label><input type="checkbox" checked={showPointers} onChange={e=>setShowPointers(e.target.checked)}/>Pointers</label><button className="small-icon" onClick={clear} title="Clear list"><Trash2 size={16}/></button></div></div>
       <div className="diagram" role="group" aria-label={`${TYPES[type].name}: ${displayedOrdered.length?displayedOrdered.map(node=>node.data).join(' linked to '):'empty list'}`}><span className="head-tag">HEAD → {displayedOrdered.length?addr(displayedOrdered[0].id,displayedNodes):'NULL'}</span>{!displayedOrdered.length?<div className="empty"><GitBranch size={34}/><b>No nodes yet</b><span>Insert a node to begin.</span></div>:<><div className="diagram-scroll" ref={diagramScrollRef}><div className={`node-flow ${type}`}>{displayedOrdered.map((node,i)=><React.Fragment key={node.id}><div className={`node-block ${highlight===node.id||pending?.stepFocus?.[pending.step]===node.id?'focused':''}`}><div className="node-top"><span>NODE {i+1}</span><span className="node-markers">{i===0&&<b>HEAD</b>}{i===displayedOrdered.length-1&&<b>TAIL</b>}</span></div><div className={`node-fields ${type==='DLL'||type==='DCLL'?'three':''}`}>{(type==='DLL'||type==='DCLL')&&<div className="field pointer"><small>PREV</small><b>{showPointers?addr(node.prevId,displayedNodes):'•••'}</b></div>}<div className="field data"><small>DATA</small><b>{node.data}</b></div><div className="field pointer"><small>NEXT</small><b>{showPointers?addr(node.nextId,displayedNodes):'•••'}</b></div></div>{showMemory&&<div className="address">ADDR: 0x{node.address.toString(16).toUpperCase()}</div>}</div>{i<displayedOrdered.length-1&&(type==='DLL'||type==='DCLL'?<div className="connector bidirectional" aria-hidden="true"><div className="link-lane next-lane"><span>NEXT</span><i/><ArrowRight size={16}/></div><div className="link-lane prev-lane"><ArrowLeft size={16}/><i/><span>PREV</span></div></div>:<div className="connector" aria-hidden="true"><span/><ArrowRight size={18}/><small>NEXT</small></div>)}</React.Fragment>)}</div></div><div className="diagram-scroll-controls"><span>Swipe to explore nodes</span><div><button className="small-icon" onClick={()=>scrollDiagram(-1)} aria-label="Scroll diagram left" title="Scroll left"><ChevronLeft size={17}/></button><button className="small-icon" onClick={()=>scrollDiagram(1)} aria-label="Scroll diagram right" title="Scroll right"><ChevronRight size={17}/></button></div></div></>}{(type==='CLL'||type==='DCLL')&&displayedOrdered.length>0&&<div className="circular-link"><span>{type==='DCLL'?'TAIL.next → HEAD · HEAD.prev ← TAIL':'TAIL.next → HEAD'}</span><b>↶</b></div>}</div>
       <div className="structure-inspector"><div><span>HEAD</span><b>{displayedOrdered.length?addr(displayedOrdered[0].id,displayedNodes):'NULL'}</b></div><div><span>TAIL</span><b>{displayedOrdered.length?addr(displayedOrdered[displayedOrdered.length-1].id,displayedNodes):'NULL'}</b></div><p>{type==='SLL'?'Each node points forward; the tail points to NULL.':type==='DLL'?'Each node links forward and backward; the end pointers are NULL.':type==='CLL'?'The tail points back to HEAD, so the list has no NULL end.':'Next and previous links wrap around between the tail and HEAD.'}</p>{pending&&pending.steps[pending.step]?.startsWith('TEMP follows HEAD to node')&&<span className="cursor-badge">TRAVERSING · STEP {pending.step+1}</span>}</div>
       <div className="legend"><span><i className="cyan"/>Data field</span><span><i className="purple"/>Pointer field</span><span><i className="green"/>Current node</span><span className="node-count">{displayedOrdered.length} nodes{pending&&pending.step===pending.steps.length-1?' · preview':''}</span></div>
       <div className="status" aria-hidden="true"><i/>{status}</div>
       {pending&&<div className="step-player" aria-label="Operation walkthrough"><div className="step-top"><b>Operation walkthrough</b><span>Step {pending.step+1} / {pending.steps.length}</span></div><p>{pending.steps[pending.step]}</p>{pending.step===pending.steps.length-1&&<p className="step-visual-note">The diagram now previews the result. Apply it to update your list, or go back to review.</p>}<div className="step-controls"><button className="ghost" onClick={stepBack} disabled={pending.step===0}><SkipBack size={14}/>Previous</button><div className="step-dots" aria-hidden="true">{pending.steps.map((_,i)=><i key={i} className={i<=pending.step?'done':''}/>)}</div><button className="primary" onClick={stepForward}>{pending.step===pending.steps.length-1?'Apply changes':'Next step'}<SkipForward size={14}/></button></div></div>}
      </section></div>
     <div className="bottom-grid"><section className="panel compact-panel"><div className="panel-title"><h2>Quick tools</h2><span className="kicker">STRUCTURE</span></div><div className="quick-grid"><button onClick={sort}>Sort ascending</button><button onClick={removeDuplicates}>Remove duplicates</button><button onClick={rotate}>Rotate right</button><button onClick={swapPairs}>Swap adjacent pairs</button><button onClick={palindrome}>Palindrome check</button><button onClick={updateNode}>Update at index</button></div></section><section className="panel compact-panel"><div className="panel-title"><h2>List statistics</h2><span className="kicker">LIVE DATA</span></div><div className="stats">{Object.entries(stats).map(([k,v])=><div key={k}><small>{k}</small><b>{v}</b></div>)}</div><div className="transfer"><button onClick={exportJSON}><Download size={14}/>Export JSON</button><label><FileUp size={14}/>Import JSON<input type="file" accept=".json,application/json" onChange={importJSON}/></label></div></section></div>
    </>}
    {section==='memory'&&<><PageTitle kicker="POINTERS & MEMORY" title="Memory Lab" subtitle="Inspect simulated addresses, pointer targets and allocation status."/><div className="memory-summary"><Metric label="Allocated nodes" value={nodes.length}/><Metric label="Simulated memory" value={`${nodes.length*16} bytes`}/><Metric label="HEAD address" value={ordered.length?addr(ordered[0].id,nodes):'NULL'}/><Metric label="TAIL address" value={ordered.length?addr(ordered[ordered.length-1].id,nodes):'NULL'}/></div><section className="panel table-panel"><h2>Node memory map</h2><div className="table-scroll"><table><thead><tr><th>Node ID</th><th>Address</th><th>Data</th><th>Prev address</th><th>Next address</th><th>Status</th></tr></thead><tbody>{ordered.map(n=><tr key={n.id}><td>{n.id}</td><td className="mono">0x{n.address.toString(16).toUpperCase()}</td><td>{n.data}</td><td className="mono">{addr(n.prevId,nodes)}</td><td className="mono">{addr(n.nextId,nodes)}</td><td><span className="allocated">Allocated</span></td></tr>)}</tbody></table></div><p className="muted-note">These are simulated addresses for learning. JavaScript does not expose the real memory addresses of its objects. In a C program, malloc() returns the actual address for each allocated node.</p></section><section className="panel memory-explain"><h2>How to read the memory map</h2><ul><li><b>ADDR:</b> the illustrative location of this node.</li><li><b>PREV:</b> address of the previous node, or NULL when there is no previous node.</li><li><b>NEXT:</b> address of the next node. In circular lists, the tail points back to HEAD.</li><li><b>free():</b> removes an allocated node from the C program's memory.</li></ul></section></>}
    {section==='operations'&&<><PageTitle kicker="PRACTICE OPERATIONS" title="Operations Lab" subtitle="Interactive operations are marked below. Other cards are previews of planned lessons."/><div className="operation-cards">{[['Insert at an index','Add a node at the beginning, end or a chosen index.',true],['Delete by value','Find a value, inspect the link changes and remove its node.',true],['Reverse list','Reverse node order and inspect next/previous pointers.',true],['Merge / concatenate','Join two lists, with clear rules for sorted inputs.',false],['Split list','Divide a list at a selected position.',false],['Cycle detection','Trace slow and fast pointers to detect a loop.',false],['Intersection','Find the first node shared by two lists.',false],['Reverse in groups','Reverse consecutive groups of K nodes.',false]].map(([title,description,available],i)=><div className="panel operation-card" key={title}><span className="op-number">0{i+1}</span><h3>{title}</h3><p>{description}</p>{available?<button className="ghost" onClick={()=>setSection('visualizer')}>Available in Visualizer <ArrowRight size={14}/></button>:<span className="coming">Preview · not interactive yet</span>}</div>)}</div><section className="panel operation-overview"><h2>More interactive tools</h2><p className="muted-note">The Visualizer also includes search, traversal, update, sort, duplicate removal, rotation, middle-node and Nth-from-end tools, palindrome checks and pair swapping.</p><button className="primary" onClick={()=>setSection('visualizer')}>Open visualizer <ArrowRight size={15}/></button></section></>}
    {section==='programs'&&<><PageTitle kicker="C LANGUAGE LIBRARY" title="Complete C Programs" subtitle="Full menu-driven programs for all four linked-list types."/><div className="program-tabs">{Object.keys(TYPES).map(k=><button key={k} className={programType===k?'selected':''} onClick={()=>setProgramType(k)}>{k}<small>{TYPES[k].name}</small></button>)}</div><section className="panel code-panel"><div className="code-header"><div><b>{TYPES[programType].name}</b><small>Complete menu-driven C program</small></div><div><button className="ghost" onClick={()=>copy(completePrograms[programType])}><Copy size={14}/>Copy</button><button className="primary" onClick={()=>download(completePrograms[programType],programType.toLowerCase()+'_linked_list.c','text/plain')}><Download size={14}/>Download .c</button></div></div><pre><code>{completePrograms[programType]}</code></pre></section><p className="muted-note">Programs include node creation, insertion, deletion, searching, display and memory cleanup. The DLL and DCLL programs also demonstrate backward traversal.</p></>}
    {section==='debug'&&<><PageTitle kicker="LEARN FROM MISTAKES" title="Pointer Debugging Lab" subtitle="Try to diagnose a pointer bug before revealing the reasoning and fix."/><div className="debug-layout"><div className="debug-list" aria-label="Choose a debugging challenge">{debugCases.map((d,i)=><button className={debugIndex===i?'selected':''} aria-pressed={debugIndex===i} key={d.title} onClick={()=>{setDebugIndex(i);setDebugRevealed(false);setPracticeAnswer('');}}><ShieldAlert size={16}/>{d.title}</button>)}</div><section className="panel debug-card"><span className="kicker">DEBUG CHALLENGE {debugIndex+1}/{debugCases.length}</span><h2>{debugCases[debugIndex].title}</h2><div className="bug-block"><b>What you observe</b><p>{debugCases[debugIndex].symptom}</p></div><label className="field-label" htmlFor="debug-answer">What is the likely cause?</label><textarea id="debug-answer" className="answer-box" placeholder="Write your diagnosis..." value={practiceAnswer} onChange={e=>setPracticeAnswer(e.target.value)}/><button className="primary" onClick={()=>{setDebugRevealed(true);markComplete('debugging');}}>Reveal explanation</button>{debugRevealed&&<div className="solution" role="status"><b>Likely cause</b><p>{debugCases[debugIndex].cause}</p><b>How to fix it</b><p>{debugCases[debugIndex].fix}</p></div>}</section></div></>}
    {section==='learn'&&<><PageTitle kicker="DSA KNOWLEDGE" title="DSA Learning Centre" subtitle="Short lessons explain the idea before asking you to practise it."/><div className="learning-cards"><article className="panel lesson-card"><BookOpen/><h3>1. Core concepts</h3><p>A linked list is a chain of nodes. Each node stores a value and a link to another node. <b>HEAD</b> points to the first node; in a singly linked list, the last node's <b>NEXT</b> is <b>NULL</b>.</p><pre>HEAD → [12 | •] → [25 | NULL]</pre><p>Unlike an array, nodes do not need to sit next to each other in memory. To reach a value, follow links from HEAD.</p><button className="ghost" onClick={()=>markComplete('concepts')}>{completed.includes('concepts')?'Lesson completed':'I understand this lesson'} <Check size={14}/></button></article><article className="panel lesson-card"><Gauge/><h3>2. Time complexity</h3><p><b>O(1)</b> means constant work; <b>O(n)</b> means work grows with the number of nodes. Searching and indexing take O(n) because links must be followed one at a time.</p><pre>HEAD → node → node → target</pre><p>Insertion at the head is O(1). Insertion at the end is O(n) unless the implementation maintains a tail pointer.</p><button className="ghost" onClick={()=>markComplete('complexity')}>{completed.includes('complexity')?'Lesson completed':'I understand this lesson'} <Check size={14}/></button></article><article className="panel lesson-card"><Layers/><h3>3. Pointer safety</h3><p>When deleting a node, first connect its neighbours so the rest of the chain stays reachable. In a doubly linked list, update both <b>NEXT</b> and <b>PREV</b>.</p><pre>previous → next   (skip removed node)</pre><p>C programs must also call <code>free()</code> once no live pointer needs the node. Practice these cases in the debugging lab.</p><button className="ghost" onClick={()=>setSection('debug')}>Practise a bug diagnosis <ArrowRight size={14}/></button></article></div><section className="panel table-panel"><h2>Complexity comparison</h2><div className="table-scroll"><table><thead><tr><th>Operation</th><th>SLL</th><th>DLL</th><th>CLL</th><th>DCLL</th></tr></thead><tbody>{complexity.map(row=><tr key={row[0]}>{row.map((x,i)=><td key={i} className={i?'mono':''}>{x}</td>)}</tr>)}</tbody></table></div><p className="muted-note">* O(1) assumes a maintained tail pointer. Without a tail pointer, insertion at the end generally requires O(n) traversal.</p></section></>}
    {section==='exam'&&<><PageTitle kicker="TEST YOUR KNOWLEDGE" title="Exam Centre" subtitle="Answer all five questions to see your score and complete this milestone."/><div className="exam-stats"><Metric label="Questions" value={quizzes.length}/><Metric label="Answered" value={`${quizAnswered}/${quizzes.length}`}/><Metric label="Correct so far" value={quizScore}/></div>{quizFinished?<section className="panel quiz-panel quiz-results"><span className="kicker">QUIZ COMPLETE</span><h2>You got {quizScore} out of {quizzes.length} correct</h2><p>{quizScore===quizzes.length?'Excellent work — you have a strong grasp of these linked-list basics.':quizScore>=3?'Good work. Review any tricky pointer ideas, then try again to improve your score.':'Review the lessons and debugging examples, then try the quiz again.'}</p><div className="result-score">{Math.round(quizScore/quizzes.length*100)}% <small>score</small></div><button className="primary" onClick={resetQuiz}>Try again</button></section>:<section className="panel quiz-panel"><div className="quiz-top"><span>QUESTION {quizIndex+1} / {quizzes.length}</span><span>{quizScore} correct so far</span></div><h2>{quizzes[quizIndex].q}</h2><div className="answers">{quizzes[quizIndex].options.map((o,i)=><button key={o} disabled={quizAnswer!==null} className={quizAnswer===null?'':i===quizzes[quizIndex].answer?'correct':i===quizAnswer?'wrong':''} aria-pressed={quizAnswer===i} onClick={()=>answerQuiz(i)}><b>{String.fromCharCode(65+i)}</b>{o}</button>)}</div>{quizAnswer!==null&&<div className="solution" role="status"><b>{quizAnswer===quizzes[quizIndex].answer?'Correct!':'Not quite.'}</b><p>{quizzes[quizIndex].why}</p></div>}<div className="quiz-actions"><button className="ghost" onClick={resetQuiz}>Reset quiz</button><button className="primary" disabled={quizAnswer===null} onClick={nextQuiz}>{quizIndex===quizzes.length-1?'See results':'Next question'} <ArrowRight size={14}/></button></div></section>}</>}
    {section==='progress'&&<><PageTitle kicker="YOUR LEARNING" title="Progress Dashboard" subtitle="Milestones update when you finish lessons, use the visualizer, reveal a debugging explanation or complete the quiz."/><div className="progress-hero"><div className="progress-ring" style={{background:`conic-gradient(#20b5c8 ${completed.length/milestones.length*100}%,#253b53 0)`}}><b>{Math.round(completed.length/milestones.length*100)}%</b></div><div><h2>{completed.length===milestones.length?'Learning path complete!':'Keep building your DSA skills'}</h2><p>{completed.length} of {milestones.length} learning milestones completed.</p><div className="progress-track"><i style={{width:`${Math.min(100,completed.length/milestones.length*100)}%`}}/></div></div></div><div className="milestones">{milestones.map(([id,label])=><div key={id}><span>{completed.includes(id)?<Check size={16}/>:<CircleHelp size={16}/>}</span><b>{label}</b><small>{completed.includes(id)?'Completed':'Not completed'}</small></div>)}</div><button className="ghost" onClick={()=>{setCompleted([]);resetQuiz();}}>Reset learning progress</button></>}
    <footer>Linked List Lab v3 <span>•</span> React + Vite <span>•</span> Progress and list data stay in this browser.</footer>
   </main>
  </div>
 </div>;
}
function PageTitle({kicker,title,subtitle}){return <div className="page-heading"><div><span className="kicker">{kicker}</span><h1>{title}</h1><p>{subtitle}</p></div></div>}
function Metric({label,value}){return <div className="panel metric"><small>{label}</small><b>{value}</b></div>}
export default App;
