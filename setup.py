from setuptools import setup, find_packages

setup(
    name="potato_tuber_classification",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy>=1.24.0",
        "pandas>=2.0.0",
        "scikit-learn>=1.2.0",
        "pillow>=10.0.0",
        "tensorflow>=2.12.0",
        "opencv-python>=4.8.0",
        "fastapi>=0.100.0",
        "uvicorn>=0.22.0",
        "python-multipart>=0.0.6",
        "pydantic>=2.0.0",
    ],
    python_requires=">=3.8",
)
