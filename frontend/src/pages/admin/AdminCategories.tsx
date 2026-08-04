import React, { useState } from "react";
import { FolderPlus, Plus, Search, Edit2, Trash2, ChevronRight, ChevronDown, Layers, Check, X } from "lucide-react";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";

interface SubCategory { id: string; name: string; slug: string; }
interface Category { id: string; name: string; slug: string; subCategories: SubCategory[]; }

const initialCats: Category[] = [
  { id: "1", name: "Jewellery", slug: "jewellery", subCategories: [{ id: "101", name: "Necklaces", slug: "necklaces" }, { id: "102", name: "Bracelets", slug: "bracelets" }] },
  { id: "2", name: "Cosmetics", slug: "cosmetics", subCategories: [{ id: "201", name: "Lipsticks", slug: "lipsticks" }] },
];

export default function Categories() {
  const [state, setState] = useState({
    categories: initialCats, search: "", openCatId: "1" as string | null, catName: "",
    editingCat: null as Category | null, subInputs: {} as Record<string, string>,
    editingSub: null as { catId: string; subId: string; name: string } | null,
  });

  const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
  const filtered = state.categories.filter((c) => c.name.toLowerCase().includes(state.search.toLowerCase()) || c.subCategories.some((s) => s.name.toLowerCase().includes(state.search.toLowerCase())));

  const saveCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.catName.trim()) return;
    const newCats = state.editingCat ? state.categories.map((c) => c.id === state.editingCat!.id ? { ...c, name: state.catName, slug: slugify(state.catName) } : c) : [...state.categories, { id: Date.now().toString(), name: state.catName, slug: slugify(state.catName), subCategories: [] }];
    setState({ ...state, categories: newCats, catName: "", editingCat: null });
  };

  const addSub = (catId: string) => {
    const val = state.subInputs[catId];
    if (!val?.trim()) return;
    setState({ ...state, categories: state.categories.map((c) => c.id === catId ? { ...c, subCategories: [...c.subCategories, { id: Date.now().toString(), name: val, slug: slugify(val) }] } : c), subInputs: { ...state.subInputs, [catId]: "" } });
  };

  const updateSub = (catId: string, subId: string) => {
    if (!state.editingSub?.name.trim()) return;
    setState({ ...state, categories: state.categories.map((c) => c.id === catId ? { ...c, subCategories: c.subCategories.map((s) => s.id === subId ? { ...s, name: state.editingSub!.name, slug: slugify(state.editingSub!.name) } : s) } : c), editingSub: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div><h1 className="text-base font-bold uppercase tracking-wider text-gray-800">Category Management</h1><p className="text-xs text-gray-500">Manage main & sub categories</p></div>
        <div className="w-full sm:w-72"><FormInput placeholder="Search..." value={state.search} onChange={(e) => setState({ ...state, search: e.target.value })} leftIcon={<Search className="w-4 h-4" />} /></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 h-fit">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-800"><FolderPlus className="w-4 h-4 text-accent" />{state.editingCat ? "Edit Category" : "Add Category"}</div>
          <form onSubmit={saveCat} className="space-y-4">
            <FormInput label="Category Name" placeholder="e.g. Jewellery" value={state.catName} onChange={(e) => setState({ ...state, catName: e.target.value })} />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm" className="flex-1">{state.editingCat ? "Update" : "Create"}</Button>
              {state.editingCat && <Button type="button" variant="outline" size="sm" onClick={() => setState({ ...state, editingCat: null, catName: "" })}>Cancel</Button>}
            </div>
          </form>
        </div>
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 flex justify-between items-center hover:bg-gray-50/50">
                <button onClick={() => setState({ ...state, openCatId: state.openCatId === cat.id ? null : cat.id })} className="flex items-center gap-3 font-bold text-xs uppercase cursor-pointer">
                  {state.openCatId === cat.id ? <ChevronDown className="w-4 h-4 text-accent" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  <span>{cat.name}</span><span className="text-[10px] text-gray-400 lowercase">({cat.subCategories.length} sub)</span>
                </button>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!p-1.5" onClick={() => setState({ ...state, editingCat: cat, catName: cat.name })}><Edit2 className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" className="!p-1.5 text-red-500" onClick={() => setState({ ...state, categories: state.categories.filter((c) => c.id !== cat.id) })}><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
              {state.openCatId === cat.id && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/30 space-y-3">
                  <div className="flex gap-2"><FormInput placeholder="Add subcategory..." value={state.subInputs[cat.id] || ""} onChange={(e) => setState({ ...state, subInputs: { ...state.subInputs, [cat.id]: e.target.value } })} containerClassName="flex-1" /><Button variant="secondary" size="sm" onClick={() => addSub(cat.id)} leftIcon={<Plus className="w-3.5 h-3.5" />}>Add</Button></div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.subCategories.map((sub) => (
                      <div key={sub.id} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                        <Layers className="w-3 h-3 text-accent shrink-0" />
                        {state.editingSub?.catId === cat.id && state.editingSub?.subId === sub.id ? (
                          <div className="flex items-center gap-1">
                            <input autoFocus value={state.editingSub.name} onChange={(e) => setState({ ...state, editingSub: { ...state.editingSub!, name: e.target.value } })} className="w-20 px-1 border border-accent rounded text-xs outline-none" />
                            <button onClick={() => updateSub(cat.id, sub.id)} className="text-green-600"><Check className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setState({ ...state, editingSub: null })} className="text-gray-400"><X className="w-3.5 h-3.5" /></button>
                          </div>
                        ) : (
                          <><span>{sub.name}</span><div className="flex items-center gap-1 ml-1 border-l border-gray-200 pl-1.5">
                            <button onClick={() => setState({ ...state, editingSub: { catId: cat.id, subId: sub.id, name: sub.name } })} className="text-gray-400 hover:text-gray-800"><Edit2 className="w-3 h-3" /></button>
                            <button onClick={() => setState({ ...state, categories: state.categories.map((c) => c.id === cat.id ? { ...c, subCategories: c.subCategories.filter((s) => s.id !== sub.id) } : c) })} className="text-gray-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                          </div></>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}