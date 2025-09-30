'use client';

import { type ReactNode, useEffect, useState } from 'react';
import type { ToastActionElement, ToastProps } from './Toast';

/**
 * Maximum number of toasts that can be displayed simultaneously.
 * Prevents UI overflow and maintains clean notification experience.
 */
const TOAST_LIMIT = 1;

/**
 * Delay before automatically removing dismissed toasts from memory.
 * Set to 15 minutes (900,000ms) to allow for potential undo actions.
 */
const TOAST_REMOVE_DELAY = 15 * 60 * 1000; // 15 seconds

/**
 * Extended toast configuration with additional properties for the toast system.
 *
 * Combines base ToastProps with specific fields needed for toast management
 * including unique identification and content elements.
 *
 * @example
 * ```tsx
 * const toast: ToasterToast = {
 *   id: '1',
 *   variant: 'success',
 *   title: 'Success!',
 *   description: 'Your action completed successfully.',
 *   action: <ToastAction altText="View details">View</ToastAction>
 * };
 * ```
 */
type ToasterToast = ToastProps & {
  /** Unique identifier for the toast instance */
  id: string;
  /** Optional title text or React element */
  title?: ReactNode;
  /** Optional description text or React element */
  description?: ReactNode;
  /** Optional action button element */
  action?: ToastActionElement;
};

/**
 * Action types for toast state management using reducer pattern.
 *
 * Defines all possible actions that can be performed on the toast state,
 * enabling predictable state updates and better debugging.
 */
enum ActionTypes {
  /** Add a new toast to the display queue */
  ADD_TOAST = 'ADD_TOAST',
  /** Update properties of an existing toast */
  UPDATE_TOAST = 'UPDATE_TOAST',
  /** Mark a toast as dismissed (triggers exit animation) */
  DISMISS_TOAST = 'DISMISS_TOAST',
  /** Completely remove a toast from memory */
  REMOVE_TOAST = 'REMOVE_TOAST',
}

let count = 0;

const genId = () => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
};

type Action =
  | {
      type: ActionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: ActionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionTypes.DISMISS_TOAST;
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionTypes.REMOVE_TOAST;
      toastId?: ToasterToast['id'];
    };

type State = {
  toasts: ToasterToast[];
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionTypes.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Toast state reducer function that handles all toast state transitions.
 *
 * Implements predictable state updates using the reducer pattern, ensuring
 * consistent behavior across all toast operations.
 *
 * ## State Management
 * - **ADD_TOAST**: Adds new toast and enforces limit by removing excess toasts
 * - **UPDATE_TOAST**: Updates existing toast properties while preserving identity
 * - **DISMISS_TOAST**: Marks toasts as closed and schedules removal
 * - **REMOVE_TOAST**: Permanently removes toasts from state
 *
 * ## Side Effects
 * The DISMISS_TOAST action includes side effects for scheduling toast removal,
 * which could be extracted but is kept here for simplicity.
 *
 * @param state - Current toast state
 * @param action - Action to perform on the state
 * @returns Updated toast state
 *
 * @example
 * ```tsx
 * // Add a new toast
 * const newState = reducer(state, {
 *   type: ActionTypes.ADD_TOAST,
 *   toast: { id: '1', title: 'Hello', variant: 'default' }
 * });
 *
 * // Dismiss a specific toast
 * const dismissedState = reducer(state, {
 *   type: ActionTypes.DISMISS_TOAST,
 *   toastId: '1'
 * });
 * ```
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ActionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case ActionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case ActionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: ((state: State) => void)[] = [];

let memoryState: State = { toasts: [] };

const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

/**
 * Toast configuration type for creating new toasts.
 * Omits the 'id' field as it's automatically generated.
 */
type Toast = Omit<ToasterToast, 'id'>;

/**
 * Creates and displays a new toast notification.
 *
 * This is the primary function for showing toast notifications to users.
 * It automatically generates unique IDs, handles state updates, and provides
 * control functions for managing the toast lifecycle.
 *
 * ## Features
 * - **Automatic ID Generation**: Each toast gets a unique identifier
 * - **State Management**: Integrates with global toast state
 * - **Lifecycle Control**: Returns functions to update or dismiss the toast
 * - **Auto-dismiss**: Automatically closes when user dismisses
 *
 * ## Return Value
 * Returns an object with control functions:
 * - `id`: Unique identifier for the toast
 * - `dismiss()`: Function to manually dismiss the toast
 * - `update()`: Function to update toast properties
 *
 * @param props - Toast configuration (title, description, variant, etc.)
 * @returns Object with toast ID and control functions
 *
 * @example
 * ```tsx
 * // Basic success toast
 * const { dismiss } = toast({
 *   title: 'Success!',
 *   description: 'Your file was uploaded successfully.',
 *   variant: 'success'
 * });
 *
 * // Error toast with retry action
 * const errorToast = toast({
 *   title: 'Upload Failed',
 *   description: 'Could not upload file. Please try again.',
 *   variant: 'error',
 *   action: <ToastAction altText="Retry upload">Retry</ToastAction>
 * });
 *
 * // Update toast content dynamically
 * errorToast.update({
 *   title: 'Retrying...',
 *   description: 'Please wait while we retry the upload.',
 *   variant: 'default'
 * });
 *
 * // Manually dismiss toast
 * setTimeout(() => errorToast.dismiss(), 5000);
 * ```
 */
const toast = ({ ...props }: Toast) => {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: ActionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });
  const dismiss = () =>
    dispatch({ type: ActionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: ActionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
};

/**
 * React hook for managing toast notifications.
 *
 * Provides access to the global toast state and functions for creating and
 * managing toast notifications. This hook connects components to the toast
 * system and ensures reactive updates when toasts change.
 *
 * ## Features
 * - **State Synchronization**: Automatically updates when toast state changes
 * - **Toast Creation**: Provides the `toast()` function for creating notifications
 * - **Batch Dismissal**: Can dismiss all toasts or specific toasts by ID
 * - **Memory Management**: Handles proper cleanup of listeners
 *
 * ## Return Value
 * - `toasts`: Array of current toast objects
 * - `toast()`: Function to create new toast notifications
 * - `dismiss()`: Function to dismiss toasts (all or by ID)
 *
 * @returns Toast state and control functions
 *
 * @example
 * ```tsx
 * function NotificationButton() {
 *   const { toast, toasts, dismiss } = useToast();
 *
 *   const showSuccess = () => {
 *     toast({
 *       title: 'Success!',
 *       description: 'Operation completed successfully.',
 *       variant: 'success'
 *     });
 *   };
 *
 *   const clearAll = () => {
 *     dismiss(); // Dismisses all toasts
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={showSuccess}>Show Success</button>
 *       <button onClick={clearAll}>Clear All ({toasts.length})</button>
 *     </div>
 *   );
 * }
 *
 * // Usage in a form component
 * function ContactForm() {
 *   const { toast } = useToast();
 *
 *   const handleSubmit = async (data) => {
 *     try {
 *       await submitForm(data);
 *       toast({
 *         title: 'Form Submitted',
 *         description: 'We\'ll get back to you soon!',
 *         variant: 'success'
 *       });
 *     } catch (error) {
 *       toast({
 *         title: 'Submission Failed',
 *         description: 'Please check your connection and try again.',
 *         variant: 'error',
 *         action: <ToastAction altText="Retry">Retry</ToastAction>
 *       });
 *     }
 *   };
 *
 *   // ... form JSX
 * }
 * ```
 *
 * ## Usage Notes
 * - Must be used within a component tree that includes `<Toaster />`
 * - Toast state is global - changes affect all components using this hook
 * - Toasts are automatically cleaned up after the configured delay
 * - Consider UX best practices: don't overwhelm users with too many toasts
 */
const useToast = () => {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: ActionTypes.DISMISS_TOAST, toastId }),
  };
};

export { toast, useToast };
