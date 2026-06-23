import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateMemoir, useListCategories, useCreateCategory } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  subjectName: z.string().min(2, "Subject name must be at least 2 characters."),
  subjectAge: z.string().optional().transform(val => val ? parseInt(val, 10) : null),
  subjectTitle: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.string().min(1, "Please select a category."),
  excerpt: z.string().min(20, "Please provide a short excerpt (at least 20 characters)."),
  fullStory: z.string().min(100, "The story should be at least 100 characters."),
  imageUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
});

export default function Contribute() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: categories } = useListCategories();
  const createMemoir = useCreateMemoir();
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectName: "",
      subjectAge: undefined,
      subjectTitle: "",
      title: "",
      category: "",
      excerpt: "",
      fullStory: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createMemoir.mutate(
      { data: { ...values, subjectAge: values.subjectAge || null, imageUrl: values.imageUrl || null } },
      {
        onSuccess: (data) => {
          toast({
            title: "Story preserved",
            description: "Thank you for sharing this memory.",
          });
          setLocation(`/stories/${data.id}`);
        },
        onError: () => {
          toast({
            title: "Failed to save story",
            description: "There was an error saving this memory. Please try again.",
            variant: "destructive",
          });
        }
      }
    );
  };

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ["subjectName", "subjectAge", "subjectTitle", "category"] as const
      : ["title", "excerpt", "fullStory"] as const;
      
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Share a Memory</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto font-serif">
          Add a life to the archive. Whether they are famous or known only to you, their story matters.
        </p>
      </div>

      <div className="flex gap-2 mb-8 justify-center">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`h-2 w-16 rounded-sm ${step >= i ? 'bg-primary' : 'bg-muted'}`} 
          />
        ))}
      </div>

      <Card className="border-border shadow-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: The Subject */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif text-primary">The Subject</h2>
                    <p className="text-muted-foreground text-sm">Who is this story about?</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="subjectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Eleanor Vance" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="subjectAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age (Optional)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="E.g., 84" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subjectTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title or Role (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Grandfather, Teacher, Artist" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collection</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select a collection for this story" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map(category => (
                              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                            ))}
                            {categories?.length === 0 && (
                              <SelectItem value="Personal">Personal</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="button" onClick={nextStep} className="w-full mt-4">Continue to Story</Button>
                </div>
              )}

              {/* Step 2: The Story */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-serif text-primary">The Story</h2>
                      <p className="text-muted-foreground text-sm">Share their memory with the world.</p>
                    </div>
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} size="sm">Back</Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="A fitting title for this memory" {...field} className="bg-background font-serif text-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A brief 1-2 sentence summary to display in the archive..." 
                            {...field} 
                            className="bg-background resize-none h-20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullStory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Story</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write the full memory here. Take your time..." 
                            {...field} 
                            className="bg-background min-h-[300px] font-serif leading-relaxed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3">Back</Button>
                    <Button type="button" onClick={nextStep} className="w-2/3">Continue to Media</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Media & Submission */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-serif text-primary">Media</h2>
                      <p className="text-muted-foreground text-sm">Add a photograph to complete the archive.</p>
                    </div>
                    <Button type="button" variant="ghost" onClick={() => setStep(2)} size="sm">Back</Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photograph URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/photo.jpg" {...field} className="bg-background" />
                        </FormControl>
                        <FormDescription>Link to an image that represents this person or memory.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 p-6 rounded-sm border border-border mt-8">
                    <h3 className="font-serif text-lg mb-2">Ready to archive</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      By submitting this memory, you confirm that you have the right to share this story and 
                      understand it will be publicly preserved in the Memoirs archive.
                    </p>
                    
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/3">Back</Button>
                      <Button type="submit" disabled={createMemoir.isPending} className="w-2/3">
                        {createMemoir.isPending ? "Preserving..." : "Add to Archive"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
