import React, { useMemo, useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, CheckSquare, Square, X, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProduct } from "../../hooks/useProduct";
import { useCategory } from "../../hooks/useCategory";
import { usePaginationParams } from "../../hooks/Pagination/usePaginationParams";
import { Pagination } from "../../components/Pagination";
import { Skeleton } from "../../components/Skeleton";
import { debounce, validateEmptyObject, calculateDiscount } from "../../utils/helper";

const schema = z.object({
  name: z.string().min(1, "Name required"),
  categoryname: z.string().min(1, "Category required"),
  subCategory: z.string().default("None"),
  stock: z.coerce.number().min(0),
  regularPrice: z.coerce.number().min(0),
  salePrice: z.coerce.number().min(0),
  description: z.string().min(1, "Description required"),
  isPublished: z.boolean().default(true),
});

export const AdminProducts: React.FC = () => {
  const { params, setPage, handleSearch } = usePaginationParams({ pageSize: 4 });
  const { products, pagination, isLoadingProducts, createProduct, updateProduct, deleteProduct, togglePublishStatus, isProductMutationLoading } = useProduct(params);
  const { categories } = useCategory({ isAllRecord: true });
  const [state, setState] = useState({ selectedIds: [] as string[], isModalOpen: false, editingProduct: null as any, images: [] as File[], previews: [] as string[] });
  const { register, handleSubmit, watch, reset } = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", categoryname: "", subCategory: "None", stock: 0, regularPrice: 0, salePrice: 0, description: "", isPublished: true } });

  const [regPrice, salePrice, selectedCat] = watch(["regularPrice", "salePrice", "categoryname"]);
  const discount = useMemo(() => calculateDiscount(regPrice, salePrice), [regPrice, salePrice]);
  const subCategories = useMemo(() => ["None", ...(categories.find((c: any) => c._id === selectedCat)?.subCategories || [])], [categories, selectedCat]);
  const debouncedSearch = useMemo(() => debounce((val: string) => handleSearch(val), 400), [handleSearch]);

  const openModal = (product?: any) => {
    reset(product ? { ...product, categoryname: typeof product.categoryname === "object" ? product.categoryname._id : product.categoryname } : { name: "", categoryname: "", subCategory: "None", stock: 0, regularPrice: 0, salePrice: 0, description: "", isPublished: true });
    setState((prev) => ({ ...prev, isModalOpen: true, editingProduct: product || null, images: [], previews: product?.images || [] }));
  };

  const onSubmit = async (data: any) => {
    validateEmptyObject({ name: data.name, categoryname: data.categoryname, description: data.description });
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));
    state.images.forEach((img) => fd.append("images", img));
    const res = state.editingProduct ? await updateProduct(state.editingProduct._id, fd) : await createProduct(fd);
    if (res?.success) setState((prev) => ({ ...prev, isModalOpen: false }));
  };

  const isAllSel = products.length > 0 && products.every((p: any) => state.selectedIds.includes(p._id));
  const inputStyle = "w-full bg-card-bg border border-border focus:border-accent text-xs sm:text-sm text-text-dark rounded-md px-3 py-2.5 sm:py-3 outline-none font-sans font-semibold transition-all placeholder:text-muted";
  const labelStyle = "block text-[11px] sm:text-xs font-bold text-muted uppercase tracking-wider mb-1 font-sans required";

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-sans font-extrabold tracking-wider uppercase text-text-dark">PRODUCT MANAGEMENT</h1>
          <p className="text-xs md:text-sm text-muted mt-1 font-sans">
            Manage main catalog and items details (Total: <span className="font-bold text-accent">{pagination?.totalCount || 0}</span>)
          </p>
        </div>
        <button onClick={() => openModal()} className="bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 border border-primary/10 shadow-sm font-sans">
          <Plus className="w-4 h-4 text-accent" /> Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input onChange={(e) => debouncedSearch(e.target.value)} placeholder="Search for inventory products..." aria-label="Search inventory products" className="w-full bg-card-bg border border-border focus:border-accent text-sm rounded-xl pl-12 pr-4 py-3.5 outline-none transition-all font-sans text-text-dark placeholder:text-muted" />
      </div>

      <div className="flex justify-between items-center bg-card-bg border border-border px-5 py-3.5 rounded-xl">
        <button onClick={() => setState((prev) => ({ ...prev, selectedIds: isAllSel ? [] : products.map((p: any) => p._id) }))} className="flex items-center gap-2.5 text-xs md:text-sm font-bold uppercase text-text-dark hover:text-accent transition-colors font-sans">
          {isAllSel ? <CheckSquare className="w-4 h-4 text-accent" /> : <Square className="w-4 h-4 text-muted" />} Select All ({products.length})
        </button>
        <button disabled={!state.selectedIds.length} onClick={() => togglePublishStatus(state.selectedIds).then(() => setState((prev) => ({ ...prev, selectedIds: [] })))} className={`text-xs font-bold uppercase px-4 py-2 rounded-lg transition-all font-sans ${state.selectedIds.length ? "bg-primary text-white hover:bg-primary-hover" : "bg-card-bg text-muted border border-border cursor-not-allowed opacity-70"}`}>
          Publish / Draft
        </button>
      </div>

      {isLoadingProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">{[...Array(4)].map((_, i) => <div key={i} className="bg-white border border-border rounded-2xl p-4 space-y-3"><Skeleton variant="rounded" height={180} /><Skeleton variant="text" width="60%" /><Skeleton variant="text" width="90%" /></div>)}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p: any) => (
            <div key={p._id} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-square bg-card-bg">
                <img src={p.images?.[0] || "/placeholder.png"} className={`w-full h-full object-cover ${!p.isPublished && "grayscale opacity-75"}`} alt={p.name || "Product Image"} />
                <button aria-label={`Select ${p.name}`} onClick={() => setState((prev) => ({ ...prev, selectedIds: prev.selectedIds.includes(p._id) ? prev.selectedIds.filter((i) => i !== p._id) : [...prev.selectedIds, p._id] }))} className="absolute top-3 right-3 p-1.5 bg-primary/80 text-white rounded-md">
                  {state.selectedIds.includes(p._id) ? <CheckSquare className="w-4 h-4 text-accent" /> : <Square className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 space-y-2 font-sans">
                <span className="text-xs font-bold uppercase text-accent block tracking-wider">
                  {p.categoryname?.categoryname || p.categoryname} • {p.subCategory}
                </span>
                <h2 className="font-serif font-bold text-base text-text-dark line-clamp-1">{p.name}</h2>
                <p className="text-sm font-bold text-text-dark">PKR. {p.salePrice} <span className="line-through text-muted text-xs font-normal">PKR. {p.regularPrice}</span></p>
                
                <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
                  <span className="text-success font-bold">{p.stock} In Stock</span>
                  <div className="flex gap-3 sm:gap-2.5 text-muted items-center">
                    <button aria-label={p.isPublished ? "Unpublish product" : "Publish product"} onClick={() => togglePublishStatus(p._id)} className={`p-1 transition-colors ${p.isPublished ? "hover:text-primary" : "text-muted opacity-60"}`}>
                      {p.isPublished ? <Eye className="w-5 h-5 sm:w-4 sm:h-4 text-primary" /> : <EyeOff className="w-5 h-5 sm:w-4 sm:h-4 text-muted" strokeWidth={2.5} />}
                    </button>
                    <button aria-label={`Edit ${p.name}`} onClick={() => openModal(p)} className="p-1 hover:text-accent transition-colors"><Edit2 className="w-5 h-5 sm:w-4 sm:h-4" /></button>
                    <button aria-label={`Delete ${p.name}`} onClick={() => deleteProduct(p._id)} className="p-1 hover:text-danger transition-colors"><Trash2 className="w-5 h-5 sm:w-4 sm:h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && <div className="pt-4 flex justify-center"><Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={setPage} /></div>}
      {state.isModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 font-sans">
          <div className="mt-auto bg-bg-light border border-border rounded-xl w-full max-w-md max-h-[72vh] overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 no-scrollbar text-text-dark shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-2.5">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-text-dark">{state.editingProduct ? "Edit Product" : "Add Product"}</h2>
              <button aria-label="Close modal" onClick={() => setState((prev) => ({ ...prev, isModalOpen: false }))} className="text-muted hover:text-text-dark p-1"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className={labelStyle}>Product Images (Max 5)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {state.previews.map((src, i) => (
                    <div key={i} className="relative w-12 h-12 sm:w-14 sm:h-14 border border-border rounded-md overflow-hidden bg-card-bg">
                      <img src={src} className="w-full h-full object-cover" alt={`Preview ${i + 1}`} />
                      <button type="button" aria-label={`Remove image ${i + 1}`} onClick={() => setState((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i), previews: prev.previews.filter((_, idx) => idx !== i) }))} className="absolute top-0.5 right-0.5 bg-primary/80 text-white rounded-full p-0.5 hover:bg-danger"><X size={10} /></button>
                    </div>
                  ))}
                </div>
                {state.previews.length < 5 && (
                  <label className="border border-dashed border-border hover:border-accent rounded-lg p-2.5 text-center bg-card-bg flex flex-col items-center justify-center cursor-pointer transition-colors">
                    <Upload size={16} className="text-accent mb-0.5" />
                    <span className="text-[10px] sm:text-xs font-bold text-accent uppercase">Upload ({state.previews.length}/5)</span>
                    <input type="file" multiple accept="image/*" onChange={(e) => {
                      if (!e.target.files) return;
                      const files = Array.from(e.target.files).slice(0, 5 - state.previews.length);
                      setState((prev) => ({ ...prev, images: [...prev.images, ...files], previews: [...prev.previews, ...files.map((f) => URL.createObjectURL(f))] }));
                    }} className="hidden" />
                  </label>
                )}
              </div>
              <div><label className={labelStyle}>Product Name</label><input placeholder="e.g. Luxury Handbag" className={inputStyle} {...register("name")} /></div>
              <div className="grid grid-cols-2 gap-2.5">
                <div><label className={labelStyle}>Category</label><select className={inputStyle} {...register("categoryname")}>{categories.map((c: any) => <option key={c._id} value={c._id}>{c.categoryname}</option>)}</select></div>
                <div><label className={labelStyle}>Sub-Category</label><select className={inputStyle} {...register("subCategory")}>{subCategories.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
              </div>
              <div><label className={labelStyle}>Stock</label><input type="number" className={inputStyle} {...register("stock")} /></div>
              <div className="grid grid-cols-3 gap-2">
                <div><label className={`${labelStyle} before:content-['Reg_price'] sm:before:content-['Regular_Price']`}/><input type="number" className={inputStyle} {...register("regularPrice")} /></div>
                <div><label className={labelStyle}>Sale Price</label><input type="number" className={inputStyle} {...register("salePrice")} /></div>
                <div><label className={labelStyle}>Discount</label><div className={`${inputStyle} flex items-center font-bold`} style={{ color: "var(--color-discount-bg)" }}>{discount}</div></div>
              </div>
              <div><label className={labelStyle}>Description</label><textarea rows={2} placeholder="Short product description..." className={inputStyle} {...register("description")} /></div>
              <div className="flex items-center justify-between bg-card-bg p-3 rounded-lg border border-border">
                <div><p className="text-xs font-bold text-text-dark uppercase">Published</p><p className="text-[10px] text-muted">Visible on storefront</p></div>
                <input type="checkbox" className="w-4 h-4 accent-primary cursor-pointer" {...register("isPublished")} />
              </div>
              <button type="submit" disabled={isProductMutationLoading} className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold tracking-widest uppercase py-3 rounded-lg transition-all mt-1 font-sans">{isProductMutationLoading ? "Saving..." : state.editingProduct ? "Update Product" : "Add Product"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;