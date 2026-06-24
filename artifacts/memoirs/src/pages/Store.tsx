import { useState } from "react";
import { useListStoreProducts, useCreateStoreOrder } from "@workspace/api-client-react";
import type { StoreProduct } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

function formatPrice(kobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(kobo / 100);
}

const CATEGORY_ICONS: Record<string, string> = {
  journals: "📔",
  keepsakes: "🎁",
  gifts: "🃏",
  stationery: "✉️",
  gift: "🎁",
};

function ProductCard({
  product,
  onSelect,
}: {
  product: StoreProduct;
  onSelect: (p: StoreProduct) => void;
}) {
  return (
    <div className="group flex flex-col border border-border rounded bg-background hover:border-primary/40 transition-all duration-200">
      {/* Product image placeholder */}
      <div className="aspect-square bg-muted/40 rounded-t flex flex-col items-center justify-center gap-3 relative overflow-hidden">
        {product.featured && (
          <span className="absolute top-3 left-3 text-xs font-medium bg-primary/15 text-primary px-2 py-0.5 rounded-sm">
            Popular
          </span>
        )}
        <span className="text-5xl">{CATEGORY_ICONS[product.category] ?? "📦"}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{product.tagline}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="font-semibold text-base">{formatPrice(product.priceKobo)}</span>
          <button
            onClick={() => onSelect(product)}
            className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderModal({
  product,
  onClose,
}: {
  product: StoreProduct;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    quantity: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { mutate, isPending } = useCreateStoreOrder({
    mutation: {
      onSuccess: (data) => {
        setSuccessMsg(data.message);
        setSuccess(true);
      },
      onError: () => {
        setErrors({ submit: "Something went wrong. Please try again." });
      },
    },
  });

  const set =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customerName.trim()) e.customerName = "Please enter your name.";
    if (!form.customerEmail.trim() || !form.customerEmail.includes("@"))
      e.customerEmail = "Please enter a valid email.";
    if (!form.deliveryAddress.trim()) e.deliveryAddress = "Please enter a delivery address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({
      data: {
        productId: product.id,
        productName: product.name,
        quantity: form.quantity,
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
        customerPhone: form.customerPhone.trim() || null,
        deliveryAddress: form.deliveryAddress.trim(),
        notes: form.notes.trim() || null,
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-background rounded border border-border overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Order</p>
            <h2 className="font-serif text-xl">{product.name}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{formatPrice(product.priceKobo)} each</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-muted transition-colors text-muted-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-2">Order received.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{successMsg}</p>
            <button
              onClick={onClose}
              className="mt-6 h-10 px-6 rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Qty */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Quantity</label>
              <input
                type="number"
                min={1}
                max={20}
                value={form.quantity}
                onChange={(e) => setForm((f) => ({ ...f, quantity: parseInt(e.target.value, 10) || 1 }))}
                className="h-11 w-24 rounded-sm border border-border px-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Your name <span className="text-primary">*</span></label>
              <input
                type="text"
                value={form.customerName}
                onChange={set("customerName")}
                placeholder="Full name"
                className={cn("h-11 w-full rounded-sm border px-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors", errors.customerName ? "border-destructive" : "border-border")}
              />
              {errors.customerName && <p className="text-destructive text-xs mt-1">{errors.customerName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email address <span className="text-primary">*</span></label>
              <input
                type="email"
                value={form.customerEmail}
                onChange={set("customerEmail")}
                placeholder="you@example.com"
                className={cn("h-11 w-full rounded-sm border px-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors", errors.customerEmail ? "border-destructive" : "border-border")}
              />
              {errors.customerEmail && <p className="text-destructive text-xs mt-1">{errors.customerEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                type="tel"
                value={form.customerPhone}
                onChange={set("customerPhone")}
                placeholder="+234 …"
                className="h-11 w-full rounded-sm border border-border px-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Delivery address <span className="text-primary">*</span></label>
              <textarea
                value={form.deliveryAddress}
                onChange={set("deliveryAddress")}
                rows={3}
                placeholder="Street, city, state / country"
                className={cn("w-full rounded-sm border px-3 py-2.5 text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors", errors.deliveryAddress ? "border-destructive" : "border-border")}
              />
              {errors.deliveryAddress && <p className="text-destructive text-xs mt-1">{errors.deliveryAddress}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Notes <span className="text-muted-foreground font-normal">(optional)</span></label>
              <textarea
                value={form.notes}
                onChange={set("notes")}
                rows={2}
                placeholder="Gift message, special instructions, etc."
                className="w-full rounded-sm border border-border px-3 py-2.5 text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Order summary */}
            <div className="bg-muted/40 rounded border border-border px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{form.quantity} × {product.name}</span>
              <span className="font-semibold">{formatPrice(product.priceKobo * form.quantity)}</span>
            </div>

            {errors.submit && (
              <p className="text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-sm">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="h-11 w-full rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Placing order…" : "Place Order"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              No payment now — we will confirm your order and send payment details within 2–3 business days.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Store() {
  const { data: products, isLoading } = useListStoreProducts();
  const [selected, setSelected] = useState<StoreProduct | null>(null);

  const featured = products?.filter((p) => p.featured) ?? [];
  const rest = products?.filter((p) => !p.featured) ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block mb-6 px-3 py-1 border border-background/20 text-background/50 text-xs font-medium uppercase tracking-widest rounded-sm">
            Legacy Store
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-6">
            Gifts that outlive the moment.
          </h1>
          <p className="text-xl text-background/70 font-serif leading-relaxed max-w-2xl">
            Thoughtfully designed items for preserving stories, honouring legacies, and marking the milestones that matter most.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-border rounded animate-pulse">
                  <div className="aspect-square bg-muted/60 rounded-t" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted/60 rounded w-3/4" />
                    <div className="h-4 bg-muted/40 rounded w-full" />
                    <div className="h-4 bg-muted/40 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <>
                  <h2 className="text-2xl font-serif mb-2">Featured</h2>
                  <p className="text-muted-foreground mb-8">The most popular items from the Legacy Store.</p>
                  <div className="grid sm:grid-cols-2 gap-6 mb-14">
                    {featured.map((p) => (
                      <ProductCard key={p.id} product={p} onSelect={setSelected} />
                    ))}
                  </div>
                </>
              )}

              {rest.length > 0 && (
                <>
                  <h2 className="text-2xl font-serif mb-2">All Items</h2>
                  <p className="text-muted-foreground mb-8">Explore the full collection.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((p) => (
                      <ProductCard key={p.id} product={p} onSelect={setSelected} />
                    ))}
                  </div>
                </>
              )}

              {!products?.length && (
                <p className="text-muted-foreground text-center py-16">No items in the store yet. Check back soon.</p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Info banner */}
      <section className="border-t border-border py-14 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div>
              <div className="text-2xl mb-3">🚚</div>
              <h3 className="font-semibold text-sm mb-1">Delivered to your door</h3>
              <p className="text-sm text-muted-foreground">We ship across Nigeria and beyond. Delivery timelines confirmed at order.</p>
            </div>
            <div>
              <div className="text-2xl mb-3">🎁</div>
              <h3 className="font-semibold text-sm mb-1">Gift-ready packaging</h3>
              <p className="text-sm text-muted-foreground">Every item arrives beautifully packaged. Add a personal note at checkout.</p>
            </div>
            <div>
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-semibold text-sm mb-1">Order, then pay</h3>
              <p className="text-sm text-muted-foreground">Place your order now. We confirm and send payment details within 2–3 business days.</p>
            </div>
          </div>
        </div>
      </section>

      {selected && <OrderModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
