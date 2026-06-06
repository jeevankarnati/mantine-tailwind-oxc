import { ActionIcon, Checkbox, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { TodoItem } from "./types";

type Props = {
  todo: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.label);
  const [focusedWithin, setFocusedWithin] = useState(false);
  const { hovered, ref } = useHover<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    if (!editing) setEditValue(todo.label);
  }, [todo.label, editing]);

  const isActive = hovered || focusedWithin;
  const quickTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.12 };

  function confirmEdit() {
    const trimmed = editValue.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    setEditing(false);
  }

  function cancelEdit() {
    setEditValue(todo.label);
    setEditing(false);
  }

  if (editing) {
    return (
      <Group gap="xs" px="xl" py="sm">
        <TextInput
          flex={1}
          size="sm"
          radius="md"
          value={editValue}
          onChange={(e) => setEditValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmEdit();
            if (e.key === "Escape") cancelEdit();
          }}
          autoFocus
        />
        <ActionIcon variant="light" color="green" onClick={confirmEdit} aria-label="Confirm edit">
          <IconCheck size={15} />
        </ActionIcon>
        <ActionIcon variant="light" color="gray" onClick={cancelEdit} aria-label="Cancel edit">
          <IconX size={15} />
        </ActionIcon>
      </Group>
    );
  }

  return (
    <motion.div
      ref={ref}
      animate={{
        borderLeftColor: isActive ? "var(--mantine-color-blue-5)" : "rgba(0, 0, 0, 0)",
      }}
      transition={quickTransition}
      onFocusCapture={() => setFocusedWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusedWithin(false);
        }
      }}
      style={{
        borderLeftColor: "rgba(0, 0, 0, 0)",
        borderLeftStyle: "solid",
        borderLeftWidth: 2,
        boxSizing: "border-box",
      }}
    >
      <Group justify="space-between" px="xl" py="sm">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          label={
            <Text
              size="sm"
              td={todo.completed ? "line-through" : undefined}
              c={todo.completed ? "dimmed" : undefined}
            >
              {todo.label}
            </Text>
          }
        />
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive || shouldReduceMotion ? 0 : 4,
          }}
          transition={quickTransition}
        >
          <Group gap={4}>
            <Tooltip label="Edit" withArrow position="top" openDelay={400}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => setEditing(true)}
                aria-label="Edit todo"
              >
                <IconPencil size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete" withArrow position="top" openDelay={400}>
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => onDelete(todo.id)}
                aria-label="Delete todo"
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </motion.div>
      </Group>
    </motion.div>
  );
}
