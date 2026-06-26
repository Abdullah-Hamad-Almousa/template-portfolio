import { motion } from "framer-motion";
import { useState } from "react";
import { Cpu, Eye, BarChart3, ChevronRight, Play, RefreshCw, Code, Copy, Check } from "lucide-react";
import { FadeUp } from "./FadeUp";

export function Capabilities() {
  const [copied, setCopied] = useState(false);
  const [inferenceRunning, setInferenceRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [inferenceResult, setInferenceResult] = useState<string | null>(null);

  const codeString = `import tensorflow as tf
from tensorflow.keras import layers, models

def create_cnn_model(input_shape=(28, 28, 1), num_classes=10):
    """
    Builds a Convolutional Neural Network for image classification.
    """
    model = models.Sequential([
        # Feature Extraction
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        # Classification
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5), # Prevent overfitting
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runPipeline = () => {
    if (inferenceRunning) return;
    setInferenceRunning(true);
    setPipelineStep(1);
    setInferenceResult(null);

    // Simulate pipeline steps
    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setTimeout(() => {
          setPipelineStep(4);
          setInferenceRunning(false);
          setInferenceResult("Class: Handwritten Digit '7' (Conf: 99.4%)");
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <section className="pt-28 pb-20 container max-w-6xl">
      {/* Title */}
      <div className="text-center mb-16">
        <FadeUp as="div" delay={0}>
          <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
            CAPABILITIES
          </span>
        </FadeUp>
        <FadeUp as="h1" delay={0.08}>
          <span className="block text-5xl md:text-6xl font-medium tracking-tightish">
            What I Can <span className="serif">Do</span>
          </span>
        </FadeUp>
        <FadeUp as="p" delay={0.16}>
          <span className="block text-muted-foreground text-base max-w-xl mx-auto mt-4 leading-relaxed">
            I perform advanced exploratory analysis, design high-precision algorithms, and train scalable deep learning models.
          </span>
        </FadeUp>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          {
            icon: <BarChart3 className="text-primary w-6 h-6" />,
            title: "Exploratory Data Analysis (EDA)",
            description:
              "Performing deep dives into large, high-dimensional datasets to clean, normalize, and expose hidden trends that inform machine learning engineering and business logic.",
          },
          {
            icon: <Cpu className="text-primary w-6 h-6" />,
            title: "Advanced Algorithmic Design",
            description:
              "Designing specialized mathematical models, regression pipelines, and custom metrics for high-accuracy applications, focusing on robust predictive stability.",
          },
          {
            icon: <Eye className="text-primary w-6 h-6" />,
            title: "Deep Learning & Computer Vision",
            description:
              "Training custom convolutional architectures (CNNs) and deep neural networks in PyTorch and TensorFlow, optimizing custom loops and feature extraction blocks.",
          },
        ].map((item, idx) => (
          <FadeUp key={item.title} delay={idx * 0.1}>
            <div className="liquid-glass p-8 rounded-2xl h-full flex flex-col items-start hover:border-foreground/35 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 border border-border/30">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Project Showcase - Left Side */}
        <div className="lg:col-span-5">
          <FadeUp as="h2" delay={0} className="text-2xl md:text-3xl font-medium tracking-tight mb-8">
            Project <span className="serif">Showcase</span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="space-y-6">
              {[
                {
                  category: "Computer Vision",
                  projects: [
                    { name: "DeepLearningMnist", desc: "CNN for handwritten digit recognition with over 98% accuracy." },
                    { name: "TensorflowImgClassification", desc: "End-to-end multi-class image classification and augmentation pipeline." },
                  ],
                },
                {
                  category: "Predictive Modeling",
                  projects: [
                    { name: "DeepLearningWine", desc: "Physicochemical quality assessment neural network." },
                    { name: "LoadApproval", desc: "Automated loan eligibility prediction system using gradient boosting." },
                  ],
                },
                {
                  category: "Deep Learning Experiments",
                  projects: [
                    { name: "TestTwoTensorFlow", desc: "Custom training loops and gradient visualizers." },
                    { name: "TenserflowEp0", desc: "Foundational pattern implementations in TensorFlow." },
                  ],
                },
              ].map((cat) => (
                <div key={cat.category} className="relative pl-6 border-l border-border/40">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-foreground/50" />
                  <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3">
                    {cat.category}
                  </h4>
                  <ul className="space-y-4">
                    {cat.projects.map((proj) => (
                      <li key={proj.name} className="group">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform duration-200 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium text-foreground block group-hover:text-primary transition-colors duration-200">
                              {proj.name}
                            </span>
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              {proj.desc}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Code Sample - Right Side */}
        <div className="lg:col-span-7">
          <FadeUp as="div" delay={0.16} className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Code size={16} /> CNN Architecture Template
            </span>
            <button
              onClick={copyCode}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-foreground/5 transition-all"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-green-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy Code
                </>
              )}
            </button>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="liquid-glass rounded-xl overflow-hidden border border-border/30">
              <div className="bg-background/40 border-b border-border/30 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-xs text-muted-foreground font-mono ml-2">cnn_model.py</span>
              </div>
              <pre className="p-5 text-xs font-mono overflow-x-auto text-left leading-relaxed text-foreground/80 max-h-[380px] scrollbar-thin bg-background/10">
                <code>{codeString}</code>
              </pre>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Interactive Prototype visualizer */}
      <FadeUp delay={0}>
        <div className="liquid-glass p-8 rounded-2xl border border-border/40 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Live Mockup
            </span>
          </div>

          <h3 className="text-xl font-medium mb-3">ML Pipeline Visualizer</h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            Click Run Inference to simulate data ingestion, feature extraction, convolutional pooling, and softmax output generation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8 relative">
            {[
              { id: 1, name: "Data Ingestion", step: "Ingesting 28x28 grayscale image arrays" },
              { id: 2, name: "Feature Map", step: "Computing 32 feature matrices (Relu)" },
              { id: 3, name: "Max Pooling", step: "Downsampling spatial resolution to 14x14" },
              { id: 4, name: "Softmax Output", step: "Mapping 64 flattened outputs to probability vector" },
            ].map((s) => {
              const active = pipelineStep >= s.id;
              const current = pipelineStep === s.id;
              return (
                <div
                  key={s.id}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                    current
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                      : active
                      ? "border-foreground/30 bg-foreground/5"
                      : "border-border/30 bg-transparent opacity-40"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-muted-foreground">Step 0{s.id}</span>
                    {current && <RefreshCw size={12} className="animate-spin text-primary" />}
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{s.name}</h4>
                  <p className="text-[11px] text-muted-foreground leading-normal">{s.step}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={runPipeline}
              disabled={inferenceRunning}
              className={`flex items-center gap-2 bg-foreground text-background font-semibold rounded-full px-6 py-2.5 text-sm tracking-wide transition-all ${
                inferenceRunning ? "opacity-50 cursor-not-allowed" : "hover:scale-103 active:scale-97"
              }`}
            >
              <Play size={14} fill="currentColor" />
              {inferenceRunning ? "Processing..." : "Run Inference"}
            </button>
            <button
              onClick={() => {
                setPipelineStep(0);
                setInferenceResult(null);
                setInferenceRunning(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Reset Canvas
            </button>
          </div>

          {inferenceResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 max-w-sm mx-auto text-emerald-400 font-mono text-xs"
            >
              {inferenceResult}
            </motion.div>
          )}
        </div>
      </FadeUp>
    </section>
  );
}
