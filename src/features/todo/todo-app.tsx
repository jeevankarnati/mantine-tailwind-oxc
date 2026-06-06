import { Box, Divider, Paper, Stack } from "@mantine/core";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/lib";
import type { TodoItem as TodoItemType } from "./types";
import { useTodoStore } from "./store";
import TodoEmptyState from "./todo-empty-state";
import TodoFilterTabs from "./todo-filter-tabs";
import TodoHeader from "./todo-header";
import TodoInput from "./todo-input";
import TodoItem from "./todo-item";

export default function TodoApp() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);
  const shouldReduceMotion = useReducedMotion();
  const subtleTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.2, 0.7, 0.3, 1] as const };

  const { activeTodos, completedTodos } = todos.reduce(
    (acc, t) => {
      (t.completed ? acc.completedTodos : acc.activeTodos).push(t);
      return acc;
    },
    { activeTodos: [] as TodoItemType[], completedTodos: [] as TodoItemType[] }
  );
  const visibleTodos =
    filter === "all" ? todos : filter === "active" ? activeTodos : completedTodos;
  const completionPct =
    todos.length === 0 ? 0 : Math.round((completedTodos.length / todos.length) * 100);

  return (
    <div className={cn("flex min-h-screen items-start justify-center px-4 pt-16")}>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={subtleTransition}
        style={{ width: "100%", maxWidth: 520 }}
      >
        <Paper w="100%" shadow="sm" radius="md" p={0} withBorder>
          <TodoHeader
            total={todos.length}
            remaining={activeTodos.length}
            completionPct={completionPct}
          />
          <Divider />
          <TodoInput />
          <Divider />
          <TodoFilterTabs
            filter={filter}
            onFilterChange={setFilter}
            total={todos.length}
            activeCount={activeTodos.length}
            completedCount={completedTodos.length}
          />
          <Divider />
          <Stack gap={0}>
            <AnimatePresence initial={false} mode="popLayout">
              {visibleTodos.length > 0 ? (
                visibleTodos.map((todo, i) => (
                  <motion.div
                    key={todo.id}
                    layout
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 6, scale: 0.98, height: 0 }
                    }
                    transition={subtleTransition}
                    style={{ overflow: "hidden" }}
                  >
                    <Box>
                      <TodoItem todo={todo} />
                      {i < visibleTodos.length - 1 && <Divider />}
                    </Box>
                  </motion.div>
                ))
              ) : (
                <TodoEmptyState key={`empty-${filter}`} filter={filter} />
              )}
            </AnimatePresence>
          </Stack>
        </Paper>
      </motion.div>
    </div>
  );
}
