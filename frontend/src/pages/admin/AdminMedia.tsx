import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Trash2,
  Upload,
  Filter,
  Film,
  Plus,
  Layers,
  HardDrive,
} from "lucide-react";
import { Button } from "../../components/Button";
import { FormSelect, type SelectOption } from "../../components/FormSelect";
import { TableSkeleton } from "../../components/TableSkeleton";
import { useMedia } from "../../hooks/useMedia";
import { usePaginationParams } from "../../hooks/Pagination/usePaginationParams";

const mediaSchema = z.object({
  title: z.string().min(1, "Please enter Asset Title"),
  key: z.string().min(1, "Please select Target Section Key"),
  files: z
    .custom<FileList>()
    .refine((f) => f && f.length > 0, "Please select at least one file"),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

export interface MediaItem {
  _id: string;
  title: string;
  key: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  createdAt: string;
}

const SECTION_KEYS: SelectOption[] = [
  { label: "All Sections", value: "ALL" },
  { label: "Carousel", value: "carousel" },
  { label: "Sidebar / Asider", value: "asider" },
  { label: "Hero Banner", value: "hero" },
  { label: "Promotions", value: "promotions" },
];

const AdminMedia = () => {
  const { params, setPage } = usePaginationParams({ pageSize: 12 });
  const [selectedKey, setSelectedKey] = useState<string>("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: { title: "", key: "carousel" },
  });

  const selectedFiles = watch("files");
  const {
    mediaList,
    isLoadingMedia,
    uploadMedia,
    deleteMedia,
    isMediaMutationLoading,
  } = useMedia({ ...params, key: selectedKey });

  const onFormSubmit = async (data: MediaFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("key", data.key);
    if (data.files)
      Array.from(data.files).forEach((file) => formData.append("media", file));

    const res = await uploadMedia(formData as any);
    if (res?.success) reset({ title: "", key: "carousel", files: undefined });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    setDeletingId(id);
    await deleteMedia(id);
    setDeletingId(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 font-sans max-w-[1600px] mx-auto min-h-screen">
      {/* Top Header - Image style Heading */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl font-black font-sans uppercase tracking-wider text-[var(--color-text-dark)]">
            MEDIA WORKSPACE
          </h1>
          <p className="text-xs font-semibold text-[var(--color-accent)] mt-1">
            {mediaList.length} assets •{" "}
            {selectedKey === "ALL" ? "All Sections" : selectedKey}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 bg-[var(--color-card-bg)] p-1.5 rounded-2xl border border-[var(--color-border)]">
          <div className="flex items-center gap-2 px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span className="text-xs font-semibold text-[var(--color-text-dark)]">
              Filter Section:
            </span>
          </div>
          <FormSelect
            options={SECTION_KEYS}
            value={selectedKey}
            onChange={(e) => {
              setSelectedKey(e.target.value);
              setPage(1);
            }}
            containerClassName="!w-48"
            className="!py-1.5 text-xs !rounded-xl border-none bg-[var(--color-bg-light)] shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Split Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Console: Upload Form */}
        <div className="lg:col-span-4 sticky top-6 bg-[var(--color-card-bg)] rounded-3xl p-6 border border-[var(--color-border)] shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 border-b border-[var(--color-border)] pb-4">
            <div className="p-2 rounded-xl bg-[var(--color-primary)] text-white">
              <Plus className="w-4 h-4 text-[var(--color-accent)]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[var(--color-text-dark)] uppercase tracking-wider">
                New Asset
              </h2>
              <p className="text-[10px] text-[var(--color-muted)]">
                Upload to section database
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[var(--color-text-dark)] block mb-1.5 required">
                Asset Title
              </label>
              <input
                type="text"
                placeholder="e.g. Hero Collection Slide"
                {...register("title")}
                className="w-full h-10 px-3.5 text-xs bg-[var(--color-bg-light)] rounded-xl border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)] transition font-medium"
              />
              {errors.title && (
                <p className="text-[11px] text-[var(--color-danger)] mt-1 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--color-text-dark)] block mb-1.5 required">
                Section Mapping Key
              </label>
              <FormSelect
                options={SECTION_KEYS.filter((k) => k.value !== "ALL")}
                {...register("key")}
                className="!py-2 text-xs !rounded-xl bg-[var(--color-bg-light)] border-[var(--color-border)] font-medium"
              />
              {errors.key && (
                <p className="text-[11px] text-[var(--color-danger)] mt-1 font-medium">
                  {errors.key.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--color-text-dark)] block mb-1.5 required">
                File Stream
              </label>
              <div className="relative border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-2xl p-6 text-center transition-all bg-[var(--color-bg-light)] group cursor-pointer">
                <Upload className="w-6 h-6 mx-auto text-[var(--color-accent)] mb-2 group-hover:-translate-y-1 transition duration-200" />
                <p className="text-xs font-bold text-[var(--color-text-dark)]">
                  Drop media here or browse
                </p>
                <p className="text-[10px] text-[var(--color-muted)] mt-1">
                  Images or Videos
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  {...register("files")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {selectedFiles && selectedFiles.length > 0 && (
                <p className="text-[11px] font-bold text-[var(--color-accent)] mt-2">
                  ✓ {selectedFiles.length} file(s) selected
                </p>
              )}
              {errors.files && (
                <p className="text-[11px] text-[var(--color-danger)] mt-1 font-medium">
                  {errors.files.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isMediaMutationLoading}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md"
            >
              Publish To Vault
            </Button>
          </form>
        </div>

        {/* Right Section: Media Gallery Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--color-accent)]" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-dark)]">
                Active Vault Assets
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider">
              Key:{" "}
              <strong className="text-[var(--color-accent)]">
                {selectedKey}
              </strong>
            </span>
          </div>

          {isLoadingMedia ? (
            <TableSkeleton rows={3} columns={3} />
          ) : mediaList.length === 0 ? (
            <div className="p-16 text-center bg-[var(--color-card-bg)] rounded-3xl border border-dashed border-[var(--color-border)]">
              <HardDrive className="w-10 h-10 mx-auto text-[var(--color-muted)] mb-3" />
              <p className="text-xs font-bold text-[var(--color-text-dark)] uppercase tracking-wider">
                Vault Empty
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {mediaList.map((item: MediaItem) => (
                <div
                  key={item._id}
                  className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-md"
                >
                  <div className="aspect-[4/3] w-full bg-[var(--color-primary)] relative overflow-hidden">
                    {item.mediaType === "video" ? (
                      <div className="relative w-full h-full">
                        <video
                          src={item.mediaUrl}
                          className="w-full h-full object-cover"
                        />
                        <Film className="absolute top-3 right-3 w-4 h-4 text-white/80" />
                      </div>
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    )}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase bg-[var(--color-primary)]/90 text-[var(--color-accent)] border border-[var(--color-accent)]/30 backdrop-blur-md">
                      #{item.key}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-[var(--color-danger)] text-white hover:opacity-90 transition-all shadow-md disabled:opacity-50"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-3.5 bg-[var(--color-card-bg)] border-t border-[var(--color-border)]">
                    <h3 className="text-xs font-bold text-[var(--color-text-dark)] truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--color-muted)]">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </span>
                      <span className="uppercase font-mono text-[9px] font-semibold text-[var(--color-accent)]">
                        {item.mediaType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMedia;
