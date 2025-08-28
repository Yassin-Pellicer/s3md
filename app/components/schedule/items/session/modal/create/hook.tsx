import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getSeriesByIdAction,
  uploadSeriesAction,
} from "@/app/server/management.action";
import { Group } from "@/app/types/Group";
import { useCourseStore } from "@/app/contexts/course.store";
import { Subject } from "@/app/types/Subject";
import { Session } from "@/app/types/Session";
import { SessionForm } from "@/app/types/SessionForm";

export function useSessionForm({
  group,
  initialDateTime,
  editingSession,
  session,
}: {
  group?: Group | null;
  initialDateTime?: Date | null;
  editingSession?: any;
  session?: Session; 
}) {
  const [formData, setFormData] = useState<SessionForm>({
    session: {
      id: "",
      description: "",
      duration: 60,
      date: new Date(),
      groupId: group?.id ?? "",
      subjectId: "",
    },
    series: { days: [], repeats: false },
  });

  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const courseStore = useCourseStore();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const currentDays = prev.series?.days ?? [];
      const updatedDays = currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];

      return {
        ...prev,
        series: {
          ...prev.series,
          days: updatedDays,
        },
      };
    });
  };

  const initializeData = async () => {
    setIsLoading(true);
    try {
      setSubjectList(courseStore.selectedCourse?.subjects ?? []);
      if(!group) setGroupList(courseStore.selectedCourse?.groups ?? []);
      
      if (session) {
        const sessionData = {
          id: session.id,
          description: session.description ?? "",
          duration: session.duration ?? 60,
          date: session.date,
          groupId: session.groupId,
          subjectId: session.subjectId,
          seriesId: session.seriesId,
        };

        if (session.seriesId) {
          const seriesData = await getSeriesByIdAction(session.seriesId);
          console.log("Series data fetched:", seriesData);
          
          const hasSeriesData = seriesData && (seriesData.days?.length > 0 || seriesData.repeats);
          
          setFormData({
            session: sessionData,
            series: {
              days: seriesData?.days ?? [],
              endsAt: seriesData?.endsAt ?? null,
              repeats: hasSeriesData ? true : (seriesData?.repeats ?? false),
            },
          });
        } else {
          setFormData({
            session: sessionData,
            series: { days: [], repeats: false },
          });
        }
      } else {
        setFormData({
          session: {
            id: "",
            description: "",
            duration: 60,
            date: initialDateTime ?? new Date(),
            groupId: group?.id ?? "",
            subjectId: "",
          },
          series: { days: [], repeats: false },
        });
      }
    } catch (error) {
      console.error("Failed to load initial data:", error);
      setErrors({ submit: "Failed to load subjects and groups" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, [group?.id, session?.id, initialDateTime]);

  useEffect(() => {
    if (editingSession) {
      setFormData((prev) => ({
        ...prev,
        session: {
          ...prev.session,
          description: editingSession.extendedProps?.description ?? "",
          duration: editingSession.extendedProps?.duration ?? 60,
          date: editingSession.start ? new Date(editingSession.start) : new Date(),
          subjectId: editingSession.extendedProps?.subjectId ?? "",
        },
      }));
    }
  }, [editingSession]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    setErrors({});
    try {
      await uploadSeriesAction(formData);
    } catch (error) {
      console.error("Submit error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create session(s). Please try again.";
      setErrors({ submit: errorMessage });
    }
  }, [formData]);

  const selectedSubject = useMemo(
    () => subjectList.find((s) => s.id === formData.session?.subjectId),
    [subjectList, formData.session?.subjectId]
  );

  const selectedGroup = useMemo(
    () => groupList.find((s) => s.id === formData.session?.groupId),
    [groupList, formData.session?.groupId]
  );

  return {
    formData,
    errors,
    isLoading,
    subjectList,
    groupList,
    setSubjectList,
    setGroupList,
    group,
    selectedSubject,
    selectedGroup,
    setFormData,
    handleSubmit,
    daysOfWeek,
    handleDayToggle,
  };
}